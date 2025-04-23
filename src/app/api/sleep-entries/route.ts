import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route'; // Import authOptions
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET handler to fetch sleep entries
export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const url = new URL(req.url);
    const limit = parseInt(url.searchParams.get('limit') || '50');
    const offset = parseInt(url.searchParams.get('offset') || '0');
    const patientId = url.searchParams.get('patientId'); // For doctor role

    try {
        // If a doctor is fetching a specific patient's entries
        if (session.user.role === 'DOCTOR' && patientId) {
            // First verify that this doctor has access to this patient
            const doctorProfile = await prisma.doctorProfile.findUnique({
                where: { userId: session.user.id },
                include: {
                    patients: {
                        where: { id: patientId },
                        select: { id: true }
                    }
                }
            });

            if (!doctorProfile || doctorProfile.patients.length === 0) {
                return NextResponse.json({ message: 'Access denied to this patient' }, { status: 403 });
            }

            // Fetch the patient's sleep entries
            const entries = await prisma.sleepEntry.findMany({
                where: { patientId },
                orderBy: { date: 'desc' },
                take: limit,
                skip: offset
            });

            return NextResponse.json(entries);
        }

        // If a patient is fetching their own entries
        if (session.user.role === 'PATIENT') {
            // Find patient profile from user ID
            const patientProfile = await prisma.patientProfile.findUnique({
                where: { userId: session.user.id }
            });

            if (!patientProfile) {
                return NextResponse.json({ message: 'Patient profile not found' }, { status: 404 });
            }

            // Fetch the patient's sleep entries
            const entries = await prisma.sleepEntry.findMany({
                where: { patientId: patientProfile.id },
                orderBy: { date: 'desc' },
                take: limit,
                skip: offset
            });

            return NextResponse.json(entries);
        }

        // If we reach here, the user is not authorized to fetch sleep entries
        return NextResponse.json({ message: 'Invalid role for this operation' }, { status: 403 });

    } catch (error) {
        console.error("Error fetching sleep entries:", error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

// POST handler to create a new sleep entry
export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id || session.user.role !== 'PATIENT') {
        return NextResponse.json({ message: 'Unauthorized or Invalid Role' }, { status: 401 });
    }

    try {
        const body = await req.json();

        // Validate incoming data (basic example, add more robust validation as needed)
        const { date, bedtime, wakeUpTime, timeToFallAsleepMinutes, timesWokenUp, timeAwakeDuringNightMinutes, sleepQualityRating, restedRating, notes } = body;

        if (!date || !bedtime || !wakeUpTime || typeof sleepQualityRating === 'undefined' || typeof restedRating === 'undefined') {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        // Find the patient profile linked to the user ID
        const patientProfile = await prisma.patientProfile.findUnique({
            where: { userId: session.user.id },
        });

        if (!patientProfile) {
            return NextResponse.json({ message: 'Patient profile not found' }, { status: 404 });
        }

        // Create the sleep entry
        const sleepEntry = await prisma.sleepEntry.create({
            data: {
                patientId: patientProfile.id,
                date: new Date(date), // Ensure date is a Date object
                bedtime: new Date(bedtime),
                wakeUpTime: new Date(wakeUpTime),
                timeToFallAsleepMinutes: parseInt(timeToFallAsleepMinutes) || 0,
                timesWokenUp: parseInt(timesWokenUp) || 0,
                timeAwakeDuringNightMinutes: parseInt(timeAwakeDuringNightMinutes) || 0,
                sleepQualityRating: parseInt(sleepQualityRating),
                restedRating: parseInt(restedRating),
                notes: notes || null,
            },
        });

        return NextResponse.json(sleepEntry, { status: 201 }); // 201 Created

    } catch (error) {
        console.error("Error creating sleep entry:", error);
        if (error instanceof SyntaxError) { // Handle JSON parsing errors
            return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
        }
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

// Optional: GET handler to fetch entries (implement later)
// export async function GET(req: NextRequest) { ... } 