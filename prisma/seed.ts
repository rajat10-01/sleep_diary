import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  // --- Create Dummy Doctor ---
  const doctorEmail = 'doctor@example.com';
  let doctor = await prisma.user.findUnique({
    where: { email: doctorEmail },
    include: { doctorProfile: true },
  });

  if (!doctor) {
    doctor = await prisma.user.create({
      data: {
        email: doctorEmail,
        name: 'Dr. Alice Wonderland',
        role: 'DOCTOR', // Use string as defined in schema
        doctorProfile: {
          create: {
            specialty: 'Sleep Medicine',
            clinicName: 'General Hospital',
          },
        },
      },
      include: {
        doctorProfile: true,
      },
    });
    console.log(`Created doctor with id: ${doctor.id}`);
  }

  // --- Create Dummy Patient (linked to the doctor) ---
  const patientEmail = 'patient@example.com';
  let patient = await prisma.user.findUnique({
    where: { email: patientEmail },
  });

  if (!patient) {
    patient = await prisma.user.create({
      data: {
        email: patientEmail,
        name: 'Bob The Patient',
        role: 'PATIENT', // Use string as defined in schema
        patientProfile: {
          create: {
            dateOfBirth: new Date(1990, 5, 15), // Example DOB
            // Link patient to the doctor created/found above
            // Ensure doctor and doctor.doctorProfile are not null
            ...(doctor && doctor.doctorProfile && { doctorId: doctor.doctorProfile.id }),
          },
        },
      },
      include: {
        patientProfile: true,
      },
    });
    console.log(`Created patient with id: ${patient.id} linked to doctor: ${doctor?.id}`);
  }

  console.log(`Seeding finished.`);
}

main()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 