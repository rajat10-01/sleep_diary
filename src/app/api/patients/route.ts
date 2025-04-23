import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Only doctors can access the patients list
    if (session.user.role !== 'DOCTOR') {
        return NextResponse.json({ message: 'Invalid role for this operation' }, { status: 403 });
    }

    try {
        // Find the doctor profile linked to the user ID
        const doctorProfile = await prisma.doctorProfile.findUnique({
            where: { userId: session.user.id },
            include: {
                patients: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                image: true,
                            },
                        },
                        sleepEntries: {
                            orderBy: { date: 'desc' },
                            take: 10, // Get the 10 most recent entries for analysis
                        },
                    },
                },
            },
        });

        if (!doctorProfile) {
            return NextResponse.json({ message: 'Doctor profile not found' }, { status: 404 });
        }

        // Transform the data for the client
        const patients = doctorProfile.patients.map(patient => {
            // Calculate sleep metrics if entries exist
            let averageQuality = 0;
            let averageRested = 0;
            let sleepTrend = 'neutral';
            let lastEntry = null;

            if (patient.sleepEntries.length > 0) {
                // Calculate averages
                const totalQuality = patient.sleepEntries.reduce((sum, entry) => sum + entry.sleepQualityRating, 0);
                const totalRested = patient.sleepEntries.reduce((sum, entry) => sum + entry.restedRating, 0);
                
                averageQuality = parseFloat((totalQuality / patient.sleepEntries.length).toFixed(1));
                averageRested = parseFloat((totalRested / patient.sleepEntries.length).toFixed(1));
                
                // Set the last entry date
                lastEntry = patient.sleepEntries[0].date;
                
                // Determine trend (simple algorithm - can be enhanced)
                if (patient.sleepEntries.length >= 3) {
                    const recent = patient.sleepEntries[0].sleepQualityRating;
                    const older = patient.sleepEntries[2].sleepQualityRating;
                    
                    if (recent > older) {
                        sleepTrend = 'improving';
                    } else if (recent < older) {
                        sleepTrend = 'declining';
                    }
                }
            }

            return {
                id: patient.id,
                name: patient.user.name,
                email: patient.user.email,
                image: patient.user.image,
                sleepData: {
                    averageQuality,
                    averageRested,
                    sleepTrend,
                    lastEntry,
                    entryCount: patient.sleepEntries.length
                }
            };
        });

        return NextResponse.json(patients);

    } catch (error) {
        console.error("Error fetching patients:", error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
} 