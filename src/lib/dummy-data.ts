
export const dummyAadhaarPatients = [
    { aadhaar_full: '123412341234', name: 'Rahul Sharma', dob: '1993-01-05', gender: 'M', contact: '+91 9876543210', address: '45 Green Park, New Delhi', is_test: true },
    { aadhaar_full: '234523452345', name: 'Anjali Mehta', dob: '1997-08-22', gender: 'F', contact: '+91 9123456780', address: '12 Rose Street, Mumbai', is_test: true },
    { aadhaar_full: '345634563456', name: 'Vikram Patel', dob: '1979-11-30', gender: 'M', contact: '+91 9012345678', address: '5 Lakeview, Bangalore', is_test: true },
    { aadhaar_full: '456745674567', name: 'Priya Reddy', dob: '1987-02-18', gender: 'F', contact: '+91 9988776655', address: '22 Sunrise Ave, Hyderabad', is_test: true },
    { aadhaar_full: '567856785678', name: 'Sameer Khan', dob: '1975-07-01', gender: 'M', contact: '+91 9222334455', address: '11 Central Rd, Chennai', is_test: true },
    { aadhaar_full: '678967896789', name: 'Meera Iyer', dob: '1999-03-12', gender: 'F', contact: '+91 9112233445', address: '9 Lotus Lane, Pune', is_test: true },
    { aadhaar_full: '789078907890', name: 'Rohit Gupta', dob: '1984-06-25', gender: 'M', contact: '+91 9001122334', address: '77 Ocean Drive, Goa', is_test: true },
    { aadhaar_full: '890189018901', name: 'Saira Bedi', dob: '1990-09-02', gender: 'F', contact: '+91 8899001122', address: '3 Palm St, Ahmedabad', is_test: true },
    { aadhaar_full: '901290129012', name: 'Aditya Joshi', dob: '1996-04-18', gender: 'M', contact: '+91 7889900112', address: '101 Maple Ave, Noida', is_test: true },
    { aadhaar_full: '012301230123', name: 'Kavita Sharma', dob: '1978-12-08', gender: 'F', contact: '+91 7778899001', address: '8 Garden View, Lucknow', is_test: true },
    { aadhaar_full: '111122223333', name: 'Neel Verma', dob: '1965-10-10', gender: 'M', contact: '+91 6667788990', address: '14 Hilltop, Kolkata', is_test: true },
    { aadhaar_full: '222233334444', name: 'Rina Das', dob: '1992-01-20', gender: 'F', contact: '+91 5556677889', address: '2 Riverbank, Surat', is_test: true }
];

export const dummyDoctors = [
    { doctorId: "DOC-001", name: "Dr. A Kumar", email: "akumar@dummy.com", password: "pass123", specialty: "Cardiology", hospitalId: "HOS-001", contact: "+919876543210", waitTime: "15 mins", rating: 4.8, qualifications: ["MD", "PhD"], experience: 10, license: "DEL-98765", slots: ["10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00"], queue: 3, stats: { surgeriesPerformed: 320, successRate: 98, consultations: 500, patientVolume: 1200, feedback: { star5: 280, star4: 30, star3: 5, star2: 3, star1: 2 } }, certificates: [{ name: "Fellowship in Interventional Cardiology", institution: "American College of Cardiology", year: 2015 }, { name: "Advanced Cardiac Life Support", institution: "AHA", year: 2022 }] },
    { doctorId: "DOC-002", name: "Dr. S Mehra", email: "smehra@dummy.com", password: "pass123", specialty: "Dermatology", hospitalId: "HOS-001", contact: "+919876543211", waitTime: "20 mins", rating: 4.6, qualifications: ["MBBS", "DNB"], experience: 6, license: "MUM-54321", slots: ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00"], queue: 2, stats: { surgeriesPerformed: 180, successRate: 97, consultations: 800, patientVolume: 1500, feedback: { star5: 150, star4: 20, star3: 8, star2: 1, star1: 1 } }, certificates: [{ name: "Advanced Cosmetic Dermatology", institution: "IADVL", year: 2018 }] },
    { doctorId: "DOC-003", name: "Dr. R Verma", email: "rverma@dummy.com", password: "pass123", specialty: "Neurology", hospitalId: "HOS-002", contact: "+919876543212", waitTime: "10 mins", rating: 4.9, qualifications: ["MBBS", "DM"], experience: 8, license: "DEL-11223", slots: ["11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00"], queue: 1, stats: { surgeriesPerformed: 210, successRate: 95, consultations: 650, patientVolume: 1000, feedback: { star5: 200, star4: 5, star3: 2, star2: 2, star1: 1 } }, certificates: [{ name: "Stroke Management Certification", institution: "World Stroke Organization", year: 2019 }] },
    { doctorId: "DOC-004", name: "Dr. P Singh", email: "psingh@dummy.com", password: "pass123", specialty: "Pediatrics", hospitalId: "HOS-001", contact: "+919876543214", waitTime: "25 mins", rating: 4.7, qualifications: ["MBBS", "MD"], experience: 12, license: "DEL-67891", slots: ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00"], queue: 4, stats: { surgeriesPerformed: 50, successRate: 99, consultations: 1200, patientVolume: 2000, feedback: { star5: 45, star4: 3, star3: 1, star2: 1, star1: 0 } }, certificates: [{ name: "Neonatal Resuscitation Program", institution: "IAP", year: 2020 }] },
    { doctorId: "DOC-005", name: "Dr. N Sharma", email: "nsharma@dummy.com", password: "pass123", specialty: "Orthopedics", hospitalId: "HOS-002", contact: "+919876543215", waitTime: "18 mins", rating: 4.8, qualifications: ["MS Ortho"], experience: 9, license: "HYD-98765", slots: ["10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00"], queue: 2, stats: { surgeriesPerformed: 400, successRate: 96, consultations: 700, patientVolume: 1100, feedback: { star5: 380, star4: 15, star3: 3, star2: 1, star1: 1 } }, certificates: [{ name: "Joint Replacement Fellowship", institution: "SICOT", year: 2021 }] },
    { doctorId: "DOC-006", name: "Dr. L Kapoor", email: "lkapoor@dummy.com", password: "pass123", specialty: "ENT", hospitalId: "HOS-001", contact: "+919876543216", waitTime: "12 mins", rating: 4.5, qualifications: ["MS ENT"], experience: 7, license: "CHN-12345", slots: ["09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30"], queue: 2, stats: { surgeriesPerformed: 250, successRate: 97, consultations: 900, patientVolume: 1600, feedback: { star5: 220, star4: 25, star3: 5, star2: 0, star1: 0 } }, certificates: [{ name: "Micro-Ear Surgery Workshop", institution: "AIIMS", year: 2019 }] },
    { doctorId: "DOC-007", name: "Dr. M Jain", email: "mjain@dummy.com", password: "pass123", specialty: "Gynecology", hospitalId: "HOS-002", contact: "+919876543217", waitTime: "22 mins", rating: 4.9, qualifications: ["MD", "DGO"], experience: 15, license: "PUN-67890", slots: ["10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00"], queue: 5, stats: { surgeriesPerformed: 500, successRate: 99, consultations: 1500, patientVolume: 2500, feedback: { star5: 480, star4: 15, star3: 5, star2: 0, star1: 0 } }, certificates: [{ name: "Laparoscopic Surgery Specialist", institution: "FOGSI", year: 2017 }] },
    { doctorId: "DOC-008", name: "Dr. T Khanna", email: "tkhanna@dummy.com", password: "pass123", specialty: "Ophthalmology", hospitalId: "HOS-001", contact: "+919876543218", waitTime: "10 mins", rating: 4.8, qualifications: ["MS"], experience: 11, license: "BLR-54321", slots: ["11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00"], queue: 1, stats: { surgeriesPerformed: 600, successRate: 98, consultations: 1000, patientVolume: 1800, feedback: { star5: 550, star4: 40, star3: 10, star2: 0, star1: 0 } }, certificates: [{ name: "Phacoemulsification Mastery", institution: "AIOS", year: 2018 }] },
    { doctorId: "DOC-009", name: "Dr. K Reddy", email: "kreddy@dummy.com", password: "pass123", specialty: "General Medicine", hospitalId: "HOS-002", contact: "+919876543219", waitTime: "5 mins", rating: 4.6, qualifications: ["MBBS"], experience: 5, license: "KOL-11223", slots: ["08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30"], queue: 1, stats: { surgeriesPerformed: 20, successRate: 99, consultations: 2000, patientVolume: 3000, feedback: { star5: 15, star4: 3, star3: 2, star2: 0, star1: 0 } }, certificates: [{ name: "Diabetes Care", institution: "IMA", year: 2023 }] },
    { doctorId: "DOC-010", name: "Dr. V Mehta", email: "vmehta@dummy.com", password: "pass123", specialty: "Pediatrics", hospitalId: "HOS-001", contact: "+919876543220", waitTime: "15 mins", rating: 4.7, qualifications: ["MD", "DCH"], experience: 9, license: "AMD-98765", slots: ["12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00"], queue: 3, stats: { surgeriesPerformed: 30, successRate: 99, consultations: 1100, patientVolume: 1900, feedback: { star5: 25, star4: 5, star3: 0, star2: 0, star1: 0 } }, certificates: [{ name: "Pediatric Advanced Life Support", institution: "AHA", year: 2021 }] },
    { doctorId: "DOC-011", name: "Dr. Neha Kapoor", email: "nkapoor@dummy.com", password: "pass123", specialty: "Pulmonology", hospitalId: "HOS-001", contact: "+919876543221", waitTime: "18 mins", rating: 4.8, qualifications: ["MD", "DTCD"], experience: 8, license: "PUN-54321", slots: ["10:00", "10:30", "15:30", "16:00"], queue: 3, stats: { surgeriesPerformed: 100, successRate: 96, consultations: 800, patientVolume: 1400, feedback: { star5: 90, star4: 8, star3: 2, star2: 0, star1: 0 } }, certificates: [{ name: "Bronchoscopy Workshop", institution: "ICS", year: 2020 }] },
    { doctorId: "DOC-012", name: "Dr. Ritu Malhotra", email: "rmalhotra@dummy.com", password: "pass123", specialty: "Cardiology", hospitalId: "HOS-002", contact: "+919876543222", waitTime: "10 mins", rating: 4.9, qualifications: ["DM Cardiology"], experience: 12, license: "DEL-11224", slots: ["11:00", "11:30", "12:00"], queue: 2, stats: { surgeriesPerformed: 450, successRate: 99, consultations: 1200, patientVolume: 2000, feedback: { star5: 430, star4: 15, star3: 5, star2: 0, star1: 0 } }, certificates: [{ name: "Echocardiography Expert", institution: "IAE", year: 2016 }] },
    { doctorId: "DOC-013", name: "Dr. Aarav Mehta", email: "amehta@dummy.com", password: "pass123", specialty: "Dermatology", hospitalId: "HOS-003", contact: "+919876543223", waitTime: "5 mins", rating: 4.7, qualifications: ["MD"], experience: 5, license: "MUM-67891", slots: ["16:15", "16:45", "17:15"], queue: 1, stats: { surgeriesPerformed: 120, successRate: 98, consultations: 950, patientVolume: 1700, feedback: { star5: 110, star4: 8, star3: 2, star2: 0, star1: 0 } }, certificates: [{ name: "Aesthetic Medicine", institution: "ACSI", year: 2022 }] },
    { doctorId: "DOC-014", name: "Dr. Amit Verma", email: "averma@dummy.com", password: "pass123", specialty: "General Medicine", hospitalId: "HOS-002", contact: "+919876543224", waitTime: "12 mins", rating: 4.6, qualifications: ["MBBS"], experience: 10, license: "DEL-98766", slots: ["20:00", "20:30"], queue: 2, stats: { surgeriesPerformed: 10, successRate: 99, consultations: 2500, patientVolume: 4000, feedback: { star5: 8, star4: 2, star3: 0, star2: 0, star1: 0 } }, certificates: [{ name: "Critical Care Basics", institution: "ISCCM", year: 2021 }] },
    { doctorId: "DOC-015", name: "Dr. Kavya Nair", email: "knair@dummy.com", password: "pass123", specialty: "Neurology", hospitalId: "HOS-004", contact: "+919876543225", waitTime: "20 mins", rating: 4.9, qualifications: ["DM Neurology"], experience: 9, license: "DEL-11225", slots: ["18:30", "19:00"], queue: 3, stats: { surgeriesPerformed: 150, successRate: 97, consultations: 700, patientVolume: 1200, feedback: { star5: 140, star4: 8, star3: 2, star2: 0, star1: 0 } }, certificates: [{ name: "Epilepsy Management", institution: "IAN", year: 2019 }] },
    { doctorId: "DOC-016", name: "Dr. Rohit Sharma", email: "rsharma@dummy.com", password: "pass123", specialty: "Orthopedics", hospitalId: "HOS-001", contact: "+919876543226", waitTime: "15 mins", rating: 4.7, qualifications: ["MS Ortho"], experience: 7, license: "BLR-54322", slots: ["14:00", "14:30"], queue: 2, stats: { surgeriesPerformed: 300, successRate: 96, consultations: 600, patientVolume: 1000, feedback: { star5: 280, star4: 15, star3: 5, star2: 0, star1: 0 } }, certificates: [{ name: "Arthroscopy Fellowship", institution: "IAS", year: 2020 }] },
    { doctorId: "DOC-017", name: "Dr. Sneha Reddy", email: "sreddy@dummy.com", password: "pass123", specialty: "Endocrinology", hospitalId: "HOS-003", contact: "+919876543227", waitTime: "10 mins", rating: 4.8, qualifications: ["DM Endocrinology"], experience: 11, license: "HYD-98766", slots: ["09:45", "10:15"], queue: 1, stats: { surgeriesPerformed: 50, successRate: 99, consultations: 1000, patientVolume: 1500, feedback: { star5: 45, star4: 5, star3: 0, star2: 0, star1: 0 } }, certificates: [{ name: "Thyroid Disorders Management", institution: "ESI", year: 2018 }] },
    { doctorId: "DOC-018", name: "Dr. Vikram Singh", email: "vsingh@dummy.com", password: "pass123", specialty: "Oncology", hospitalId: "HOS-005", contact: "+919876543228", waitTime: "25 mins", rating: 4.9, qualifications: ["DM Oncology"], experience: 14, license: "MUM-67892", slots: ["12:30", "13:00"], queue: 4, stats: { surgeriesPerformed: 600, successRate: 95, consultations: 800, patientVolume: 1300, feedback: { star5: 580, star4: 15, star3: 5, star2: 0, star1: 0 } }, certificates: [{ name: "Advanced Immunotherapy", institution: "ISMPO", year: 2022 }] },
    { doctorId: "DOC-019", name: "Dr. Pooja Desai", email: "pdesai@dummy.com", password: "pass123", specialty: "Pediatrics", hospitalId: "HOS-006", contact: "+919876543229", waitTime: "12 mins", rating: 4.8, qualifications: ["MD", "DCH"], experience: 10, license: "CHN-12346", slots: ["10:00", "10:30"], queue: 2, stats: { surgeriesPerformed: 40, successRate: 99, consultations: 1300, patientVolume: 2100, feedback: { star5: 35, star4: 5, star2: 0, star1: 0, star3: 0 } }, certificates: [{ name: "Pediatric Nutrition", institution: "IAP", year: 2019 }] },
    { doctorId: "DOC-020", name: "Dr. Sameer Khan", email: "skhan@dummy.com", password: "pass123", specialty: "Psychiatry", hospitalId: "HOS-001", contact: "+919876543230", waitTime: "30 mins", rating: 4.9, qualifications: ["MD Psychiatry"], experience: 9, license: "BLR-54323", slots: ["19:30", "20:00"], queue: 5, stats: { surgeriesPerformed: 0, successRate: 99, consultations: 1500, patientVolume: 2200, feedback: { star5: 0, star4: 0, star3: 0, star2: 0, star1: 0 } }, certificates: [{ name: "Cognitive Behavioral Therapy", institution: "IPS", year: 2018 }] }
];


export const dummyHospitals = [
    { hospitalId: "HOS-001", name: "City Hospital", location: "Delhi", contact: "+911122334455", patientLoad: 75, coordinates: { lat: 12.9150, lng: 74.8565 } },
    { hospitalId: "HOS-002", name: "Green Hospital", location: "Mumbai", contact: "+912233445566", patientLoad: 60, coordinates: { lat: 12.9130, lng: 74.8550 } },
    { hospitalId: "HOS-003", name: "Blue Hospital", location: "Bangalore", contact: "+918099887766", patientLoad: 85, coordinates: { lat: 12.9165, lng: 74.8580 } },
    { hospitalId: "HOS-004", name: "AIIMS", location: "New Delhi", contact: "+911126588500", patientLoad: 95, coordinates: { lat: 12.9120, lng: 74.8590 } },
    { hospitalId: "HOS-005", name: "Tata Memorial", location: "Mumbai", contact: "+912224177000", patientLoad: 90, coordinates: { lat: 12.9180, lng: 74.8540 } },
    { hospitalId: "HOS-006", name: "Rainbow Children’s Hospital", location: "Chennai", contact: "+914448600000", patientLoad: 70, coordinates: { lat: 12.9100, lng: 74.8530 } }
];

export const dummyPrescriptions = [
  {
    prescription_id: "PRES-001",
    patient_aadhaar_masked: "1234",
    doctor: {
      name: "Amit Verma",
      specialty: "General Physician"
    },
    clinic: {
      name: "Fortis Hospital, Delhi"
    },
    date: "2025-09-15T20:00:00.000Z",
    medicines: [
      { name: "Paracetamol", strength: "500mg", dose: "1 tablet", form: "Tablet", frequency: "SOS for fever", duration_days: 5 },
      { name: "Vitamin C", strength: "1000mg", dose: "1 tablet", form: "Tablet", frequency: "Once daily", duration_days: 30 }
    ],
    notes: "Routine checkup. BP slightly elevated at 130/84. Recommended salt reduction.",
    e_sign_status: "signed",
    token_number: 14,
    download_pdf_url: "#",
    suggested_pharmacy: { name: "Apollo Pharmacy", location: "Near Fortis Hospital" },
    total_cost_inr: 250.50
  },
  {
    prescription_id: "PRES-002",
    patient_aadhaar_masked: "2345",
    doctor: {
      name: "Kavya Nair",
      specialty: "Neurologist"
    },
    clinic: {
      name: "AIIMS, New Delhi"
    },
    date: "2025-08-30T18:30:00.000Z",
    medicines: [
      { name: "Sumatriptan", strength: "50mg", dose: "1 tablet", form: "Tablet", frequency: "At onset of migraine", duration_days: 10 },
      { name: "Propranolol", strength: "40mg", dose: "1 tablet", form: "Tablet", frequency: "Twice daily", duration_days: 30 }
    ],
    notes: "Patient complaining of frequent migraines with aura. Prescribed Sumatriptan for acute attacks and Propranolol for prophylaxis.",
    e_sign_status: "signed",
    token_number: 9,
    download_pdf_url: "#",
    suggested_pharmacy: { name: "MedPlus", location: "South Delhi" },
    total_cost_inr: 850.00
  },
  {
    prescription_id: "PRES-003",
    patient_aadhaar_masked: "3456",
    doctor: {
      name: "Rohit Sharma",
      specialty: "Orthopedic Surgeon"
    },
    clinic: {
      name: "Columbia Asia, Bangalore"
    },
    date: "2025-07-20T14:00:00.000Z",
    medicines: [
      { name: "Etoricoxib", strength: "90mg", dose: "1 tablet", form: "Tablet", frequency: "Once daily", duration_days: 7 },
      { name: "Glucosamine", strength: "1500mg", dose: "1 sachet", form: "Powder", frequency: "Once daily", duration_days: 90 }
    ],
    notes: "Right knee pain. MRI shows early osteoarthritis. Physiotherapy recommended alongside medication.",
    e_sign_status: "pending",
    token_number: 5,
    download_pdf_url: "#",
    suggested_pharmacy: { name: "Wellness Forever", location: "Bangalore" },
    total_cost_inr: 1200.75
  },
    {
    prescription_id: "PRES-004",
    patient_aadhaar_masked: "4567",
    doctor: {
      name: "Sneha Reddy",
      specialty: "Endocrinologist"
    },
    clinic: {
      name: "Narayana Health, Hyderabad"
    },
    date: "2025-06-10T09:45:00.000Z",
    medicines: [
      { name: "Levothyroxine", strength: "50mcg", dose: "1 tablet", form: "Tablet", frequency: "Once daily before breakfast", duration_days: 90 }
    ],
    notes: "Hypothyroidism diagnosed. Started on Levothyroxine. Follow-up with TSH after 6 weeks.",
    e_sign_status: "signed",
    token_number: 2,
    download_pdf_url: "#",
    suggested_pharmacy: { name: "Generic Aadhaar Pharmacy", location: "Hyderabad" },
    total_cost_inr: 350.00
  },
  {
    prescription_id: "PRES-005",
    patient_aadhaar_masked: "5678",
    doctor: {
      name: "Vikram Singh",
      specialty: "Oncologist"
    },
    clinic: {
      name: "Tata Memorial, Mumbai"
    },
    date: "2025-05-05T12:30:00.00Z",
    medicines: [],
    notes: "Preventive cancer screening. All reports are normal. Advised regular follow-ups annually.",
    e_sign_status: "unsigned",
    token_number: 1,
    download_pdf_url: "#",
    suggested_pharmacy: { name: "N/A", location: "N/A" },
    total_cost_inr: 0.00
  }
];
export type Prescription = typeof dummyPrescriptions[0];
export type AadhaarPatient = typeof dummyAadhaarPatients[0];

export type Doctor = typeof dummyDoctors[0];

export const dummyAmbulances = [
  { id: "AMB-001", vehicle_no: "MH-01-AB-1234", driver_name: "Ramesh Kumar", driver_phone: "+919000000001", type: "ICU", speed_kmph: 60, status: "available", current_coords: { lat: 19.08, lng: 72.88 }, driver: {name: 'Ramesh Kumar', experience: 5, completedRides: 320, rating: 4.9, contact: '9000000001'}, facilities: { oxygenLevel: 95, ventilator: true, emergencyKit: true }, oxygenLevel: 95 },
  { id: "AMB-002", vehicle_no: "DL-02-CD-5678", driver_name: "Sunil Mehta", driver_phone: "+919000000002", type: "Basic", speed_kmph: 50, status: "available", current_coords: { lat: 19.06, lng: 72.86 }, driver: {name: 'Sunil Mehta', experience: 3, completedRides: 150, rating: 4.8, contact: '9000000002'}, facilities: { oxygenLevel: 98, ventilator: false, emergencyKit: true }, oxygenLevel: 98 },
  { id: "AMB-003", vehicle_no: "KA-03-EF-9012", driver_name: "Anita Sharma", driver_phone: "+919000000003", type: "Advanced Life Support", speed_kmph: 70, status: "enroute", current_coords: { lat: 19.09, lng: 72.89 }, driver: {name: 'Anita Sharma', experience: 4, completedRides: 210, rating: 4.7, contact: '9000000003'}, facilities: { oxygenLevel: 90, ventilator: true, emergencyKit: false }, oxygenLevel: 90 },
  { id: "AMB-004", vehicle_no: "TN-04-GH-3456", driver_name: "Mohammed Aslam", driver_phone: "+919000000004", type: "Basic", speed_kmph: 45, status: "available", current_coords: { lat: 19.05, lng: 72.88 }, driver: {name: 'Mohammed Aslam', experience: 2, completedRides: 100, rating: 4.6, contact: '9000000004'}, facilities: { oxygenLevel: 99, ventilator: false, emergencyKit: true }, oxygenLevel: 99 },
  { id: "AMB-005", vehicle_no: "GJ-05-IJ-7890", driver_name: "Kiran Patel", driver_phone: "+919000000005", type: "ICU", speed_kmph: 65, status: "available", current_coords: { lat: 19.07, lng: 72.85 }, driver: {name: 'Kiran Patel', experience: 6, completedRides: 400, rating: 4.9, contact: '9000000005'}, facilities: { oxygenLevel: 96, ventilator: true, emergencyKit: true }, oxygenLevel: 96 },
  { id: "AMB-006", vehicle_no: "WB-06-KL-1234", driver_name: "Rajesh Gupta", driver_phone: "+919000000006", type: "Advanced Life Support", speed_kmph: 75, status: "maintenance", current_coords: { lat: 19.10, lng: 72.90 }, driver: {name: 'Rajesh Gupta', experience: 7, completedRides: 500, rating: 4.8, contact: '9000000006'}, facilities: { oxygenLevel: 88, ventilator: true, emergencyKit: true }, oxygenLevel: 88 },
  { id: "AMB-007", vehicle_no: "RJ-07-MN-5678", driver_name: "Pooja Iyer", driver_phone: "+919000000007", type: "Basic", speed_kmph: 55, status: "available", current_coords: { lat: 19.08, lng: 72.87 }, driver: {name: 'Pooja Iyer', experience: 3, completedRides: 180, rating: 4.7, contact: '9000000007'}, facilities: { oxygenLevel: 97, ventilator: false, emergencyKit: false }, oxygenLevel: 97 },
  { id: "AMB-008", vehicle_no: "UP-08-OP-9012", driver_name: "Deepak Reddy", driver_phone: "+919000000008", type: "ICU", speed_kmph: 68, status: "available", current_coords: { lat: 19.06, lng: 72.89 }, driver: {name: 'Deepak Reddy', experience: 5, completedRides: 350, rating: 4.9, contact: '9000000008'}, facilities: { oxygenLevel: 94, ventilator: true, emergencyKit: true }, oxygenLevel: 94 },
  { id: "AMB-009", vehicle_no: "MP-09-QR-3456", driver_name: "Sandeep Singh", driver_phone: "+919000000009", type: "Basic", speed_kmph: 52, status: "available", current_coords: { lat: 19.09, lng: 72.86 }, driver: {name: 'Sandeep Singh', experience: 2, completedRides: 120, rating: 4.6, contact: '9000000009'}, facilities: { oxygenLevel: 98, ventilator: false, emergencyKit: true }, oxygenLevel: 98 },
  { id: "AMB-010", vehicle_no: "HR-10-ST-7890", driver_name: "Meena Joshi", driver_phone: "+919000000010", type: "Advanced Life Support", speed_kmph: 72, status: "available", current_coords: { lat: 19.07, lng: 72.90 }, driver: {name: 'Meena Joshi', experience: 6, completedRides: 450, rating: 4.8, contact: '9000000010'}, facilities: { oxygenLevel: 92, ventilator: true, emergencyKit: true }, oxygenLevel: 92 }
];


export const dummyMedicines = [
    { medicineId: "MED-001", name: "Paracetamol", chemical: "Acetaminophen", usage: "Fever, Pain", frequentlyUsed: true, prescribedBy: "DOC-009", govtPrice: 10.50, privatePrice: 25.00 },
    { medicineId: "MED-002", name: "Ibuprofen", chemical: "Propionic Acid", usage: "Pain, Inflammation", frequentlyUsed: true, prescribedBy: "DOC-005", govtPrice: 15.00, privatePrice: 40.00 },
    { medicineId: "MED-003", name: "Amoxicillin", chemical: "Penicillin", usage: "Bacterial Infection", frequentlyUsed: false, prescribedBy: "DOC-004", govtPrice: 50.75, privatePrice: 120.00 },
    { medicineId: "MED-004", name: "Metformin", chemical: "Biguanide", usage: "Diabetes", frequentlyUsed: true, prescribedBy: "DOC-017", govtPrice: 8.00, privatePrice: 30.00 },
    { medicineId: "MED-005", name: "Atorvastatin", chemical: "Statin", usage: "High Cholesterol", frequentlyUsed: false, prescribedBy: "DOC-001", govtPrice: 25.00, privatePrice: 90.00 },
    { medicineId: "MED-006", name: "Amlodipine", chemical: "Dihydropyridine", usage: "High Blood Pressure", frequentlyUsed: true, prescribedBy: "DOC-001", govtPrice: 12.00, privatePrice: 35.00 },
    { medicineId: "MED-007", name: "Salbutamol Inhaler", chemical: "Beta-agonist", usage: "Asthma", frequentlyUsed: true, prescribedBy: "DOC-011", govtPrice: 150.00, privatePrice: 350.00 },
    { medicineId: "MED-008", name: "Sertraline", chemical: "SSRI", usage: "Depression, Anxiety", frequentlyUsed: false, prescribedBy: "DOC-020", govtPrice: 40.00, privatePrice: 150.00 },
    { medicineId: "MED-009", name: "Cetirizine", chemical: "Antihistamine", usage: "Allergies", frequentlyUsed: true, prescribedBy: "DOC-002", govtPrice: 5.00, privatePrice: 15.00 },
    { medicineId: "MED-010", name: "Pantoprazole", chemical: "Proton Pump Inhibitor", usage: "Acidity, GERD", frequentlyUsed: true, prescribedBy: "DOC-009", govtPrice: 7.50, privatePrice: 28.00 }
];
export type Medicine = typeof dummyMedicines[0];

export const dummyInsurancePlans = [
    { planId: 'INS-001', planName: 'Suraksha Health', insurerName: 'LIC', hospitalName: 'City Hospital', city: 'Delhi', coverageLimit: 500000, premiumAnnual: 10000, premiumMonthly: 850, copayPercent: 10, waitingPeriodMonths: 24, rating: 4.5, inclusions: ['Hospitalization', 'Day Care', 'Pre &amp; Post Hospitalization'], exclusions: ['Cosmetic Surgery', 'Dental'], policyText: 'Standard policy terms apply. Pre-existing diseases covered after 2 years.' },
    { planId: 'INS-002', planName: 'Arogya Sanjeevani', insurerName: 'HDFC Ergo', hospitalName: 'Green Hospital', city: 'Mumbai', coverageLimit: 300000, premiumAnnual: 8000, premiumMonthly: 680, copayPercent: 5, waitingPeriodMonths: 36, rating: 4.7, inclusions: ['Room Rent Capped', 'ICU Charges', 'Ambulance'], exclusions: ['Maternity', 'Alternative Treatments'], policyText: 'Government-mandated standard policy. Co-pay is 5%.' },
    { planId: 'INS-003', planName: 'Optima Restore', insurerName: 'Apollo Munich', hospitalName: 'Blue Hospital', city: 'Bangalore', coverageLimit: 1000000, premiumAnnual: 15000, premiumMonthly: 1275, copayPercent: 0, waitingPeriodMonths: 36, opdCoverage: 20000, rating: 4.9, inclusions: ['Restore Benefit', 'OPD cover', 'Health Checkups'], exclusions: ['Self-inflicted injuries', 'War-related injuries'], policyText: 'Restore benefit refills sum insured if exhausted.' },
    { planId: 'INS-004', planName: 'Family Floater', insurerName: 'Star Health', hospitalName: 'AIIMS', city: 'New Delhi', coverageLimit: 750000, premiumAnnual: 12000, premiumMonthly: 1020, copayPercent: 15, waitingPeriodMonths: 24, rating: 4.6, inclusions: ['Family Cover', 'Maternity', 'Newborn Baby Cover'], exclusions: ['Adventure Sports', 'Mental Disorders'], policyText: 'Covers up to 2 adults and 2 children. Co-pay of 15% on all claims.' },
];
export type InsurancePlan = typeof dummyInsurancePlans[0];


export const dummyGeneticData = [
    { patientId: 'P-102345', markers: [{ gene: 'BRCA1', riskFactor: 'High', details: 'Associated with increased risk for breast and ovarian cancers.' }], recommendations: { preventiveCare: 'Regular mammograms and genetic counseling recommended.', medication: 'Consider PARP inhibitors if cancer develops.' } },
    { patientId: 'P-102346', markers: [{ gene: 'APOE ε4', riskFactor: 'Medium', details: 'Associated with a higher risk of developing late-onset Alzheimer\'s disease.' }], recommendations: { preventiveCare: 'Adopt a heart-healthy diet, regular exercise, and cognitive stimulation.', medication: 'No specific preventive medication; manage cardiovascular risk factors.' } },
    { patientId: 'P-102347', markers: [{ gene: 'HBB', riskFactor: 'Low', details: 'Carrier for sickle cell trait. Generally asymptomatic but can pass the trait to children.' }], recommendations: { preventiveCare: 'Genetic counseling if planning a family.', medication: 'No treatment required for sickle cell trait.' } },
];

export const dummyOrganStatus = [
    { patientId: 'P-102345', organs: [{ name: 'Heart', status: 'Normal', details: 'No abnormalities detected.', annotations: [] }] },
    { patientId: 'P-102346', organs: [{ name: 'Liver', status: 'Fatty Liver', details: 'Mild steatosis observed, likely due to lifestyle.', annotations: [{ text: 'Fatty Deposits', position: [0.5, 0.5, 0.5] }] }] },
    { patientId: 'P-102347', organs: [{ name: 'Lungs', status: 'Mild Infection', details: 'Minor inflammation in the lower lobe, suggestive of bronchitis.', annotations: [{ text: 'Inflammation', position: [0, -1, 0] }] }, { name: 'Brain', status: 'Tumor Detected', details: 'Small benign tumor in the temporal lobe.', annotations: [{ text: 'Benign Tumor', position: [1, 0, 0] }] }] }
];


export const dummyCommunication = [
  {
    id: 1,
    with: dummyDoctors.find(d => d.doctorId === "DOC-003"),
    lastMessage: { text: "Sure, I'll take a look at the MRI.", timestamp: "10:30 AM" },
    messages: [
      { sender: "Dr. A Kumar", text: "Hey, can you check the neuro scans for patient P-102345?", timestamp: "10:28 AM" },
      { sender: "Dr. R Verma", text: "Sure, I'll take a look at the MRI.", timestamp: "10:30 AM" }
    ]
  },
  {
    id: 2,
    with: dummyDoctors.find(d => d.doctorId === "DOC-002"),
    lastMessage: { text: "Thanks for the quick report!", timestamp: "Yesterday" },
    messages: [
      { sender: "Dr. S Mehra", text: "The biopsy report is in. It's benign.", timestamp: "Yesterday" },
      { sender: "Dr. A Kumar", text: "Thanks for the quick report!", timestamp: "Yesterday" }
    ]
  }
];

export const dummyBloodBank = [
    { bloodType: "A+", units: 50, hospitalId: "HOS-001" },
    { bloodType: "A-", units: 20, hospitalId: "HOS-001" },
    { bloodType: "B+", units: 35, hospitalId: "HOS-001" },
    { bloodType: "B-", units: 15, hospitalId: "HOS-001" },
    { bloodType: "AB+", units: 10, hospitalId: "HOS-001" },
    { bloodType: "AB-", units: 5, hospitalId: "HOS-001" },
    { bloodType: "O+", units: 80, hospitalId: "HOS-001" },
    { bloodType: "O-", units: 30, hospitalId: "HOS-001" },
    
    { bloodType: "A+", units: 40, hospitalId: "HOS-002" },
    { bloodType: "O+", units: 90, hospitalId: "HOS-002" },
    { bloodType: "B+", units: 25, hospitalId: "HOS-002" },
    
    { bloodType: "A+", units: 60, hospitalId: "HOS-003" },
    { bloodType: "O-", units: 40, hospitalId: "HOS-003" }
];


// --- START OF PATIENT INTERFACES AND DATA ---

export interface MedicalEncounter {
  encounterId: string;
  date: string;
  department: string;
  doctor: string;
  reason: string;
  findings: string;
  treatment: string;
  dischargeNotes: string;
  investigations?: string;
}

export interface Investigation {
  investigationId: string;
  date: string;
  doctor: string;
  type: string;
  summary: string;
  imageUrl?: string;
}

export interface Patient {
    patientId: string;
    name: string;
    dob: string;
    gender: "Male" | "Female" | "Other";
    bloodGroup: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
    phone: string;
    aadhaar: string;
    emergencyContact: {
        name: string;
        phone: string;
    };
    healthOverview: {
        chronicConditions: string[];
        allergies: string[];
        lifestyle: string;
    };
    vitals: {
        heartRate: number[];
        bloodPressure: string[];
        bloodSugar: number[];
        oxygenSaturation: number[];
    };
    medications: {
        current: { name: string, dosage: string }[];
        past: { name: string, dosage: string }[];
    };
    appointments: {
        appointmentId: string;
        date: string;
        doctorId: string;
        hospitalId: string;
        status: "booked" | "completed" | "cancelled";
        urgent: boolean;
        token: number;
        patientsAhead: number;
        waitTime: number;
        chatResponse: string;
        summary: string;
        feedback: number;
    }[];
    medicalEncounters: MedicalEncounter[];
    investigations: Investigation[];
    insurance: {
        provider: string;
        policyNumber: string;
    };
    predictions: {
        vitalsNext7Days: {
            heartRate: number[];
            bloodPressure: string[];
        };
        medicationAdherence: number[];
        appointmentProbability: number[];
    };
     analytics: {
        vitalSigns: { month: string, BP: number, HR: number }[];
        spO2: number;
        medicalVisits: { month: string, visits: number }[];
        medicationCompliance: { name: string, adherence: number }[];
        lifestyleScore: { metric: string, score: number }[];
        futureRisk: {
            cardiac: { risk: 'Low' | 'Moderate' | 'High', details: string };
            diabetes: { risk: 'Low' | 'Moderate' | 'High', details: string };
            stroke: { risk: 'Low' | 'Moderate' | 'High', details:string };
        };
    };
}


export const dummyPatients: Patient[] = [
  {
    patientId: "P-102345",
    name: "Ananya Sharma",
    dob: "1995-08-15",
    gender: "Female",
    bloodGroup: "O+",
    phone: "+919876543210",
    aadhaar: "1234-5678-9012",
    emergencyContact: { name: "Ravi Sharma", phone: "+919876543211" },
    healthOverview: {
      chronicConditions: ["Asthma", "Migraine"],
      allergies: ["Pollen"],
      lifestyle: "Moderately Active",
    },
    vitals: {
      heartRate: [72, 75, 78, 76, 74, 80, 77],
      bloodPressure: ["118/78", "120/80", "122/81", "119/79", "121/80", "120/80", "122/82"],
      bloodSugar: [85, 90, 88, 92, 91, 89, 93],
      oxygenSaturation: [98, 99, 98, 97, 99, 98, 99],
    },
    medications: {
      current: [{ name: "Salbutamol Inhaler", dosage: "2 puffs PRN" }, { name: "Sumatriptan", dosage: "50mg at onset" }],
      past: [{ name: "Montelukast", dosage: "10mg daily" }],
    },
    appointments: [
      { appointmentId: "APP-001", date: "2025-10-20T15:30:00.000Z", doctorId: "DOC-011", hospitalId: "HOS-001", status: "booked", urgent: false, token: 12, patientsAhead: 3, waitTime: 18, chatResponse: "Hello, I'll review your asthma progress during our call.", summary: "Last prescription: Inhaler 2 puffs PRN.", feedback: 0 },
      { appointmentId: "APP-002", date: "2025-10-25T11:00:00.000Z", doctorId: "DOC-012", hospitalId: "HOS-002", status: "booked", urgent: true, token: 8, patientsAhead: 2, waitTime: 10, chatResponse: "Please bring your last ECG report.", summary: "Last visit: Tachycardia, Nebulizer given.", feedback: 0 },
      { appointmentId: "APP-003", date: "2025-11-02T16:15:00.000Z", doctorId: "DOC-013", hospitalId: "HOS-003", status: "booked", urgent: false, token: 5, patientsAhead: 1, waitTime: 5, chatResponse: "Please send a photo of your skin rash before visit.", summary: "Last visit: Mild dermatitis, hydrocortisone cream prescribed.", feedback: 0 },
      { appointmentId: "APP-004", date: "2025-09-15T20:00:00.000Z", doctorId: "DOC-014", hospitalId: "HOS-002", status: "completed", urgent: false, token: 0, patientsAhead: 0, waitTime: 0, chatResponse: "", summary: "Routine Checkup, BP 130/84.", feedback: 4 },
      { appointmentId: "APP-005", date: "2025-08-30T18:30:00.000Z", doctorId: "DOC-015", hospitalId: "HOS-004", status: "completed", urgent: false, token: 0, patientsAhead: 0, waitTime: 0, chatResponse: "", summary: "Migraine treatment, prescribed Sumatriptan.", feedback: 5 },
      { appointmentId: "APP-006", date: "2025-07-20T14:00:00.000Z", doctorId: "DOC-016", hospitalId: "HOS-001", status: "completed", urgent: false, token: 0, patientsAhead: 0, waitTime: 0, chatResponse: "", summary: "Knee pain, MRI done, physiotherapy recommended.", feedback: 3 },
      { appointmentId: "APP-007", date: "2025-06-10T09:45:00.000Z", doctorId: "DOC-017", hospitalId: "HOS-003", status: "completed", urgent: false, token: 0, patientsAhead: 0, waitTime: 0, chatResponse: "", summary: "Thyroid imbalance, Levothyroxine prescribed.", feedback: 4 },
      { appointmentId: "APP-008", date: "2025-05-05T12:30:00.000Z", doctorId: "DOC-018", hospitalId: "HOS-005", status: "completed", urgent: false, token: 0, patientsAhead: 0, waitTime: 0, chatResponse: "", summary: "Preventive cancer screening, all normal.", feedback: 5 },
      { appointmentId: "APP-009", date: "2025-04-15T10:00:00.000Z", doctorId: "DOC-019", hospitalId: "HOS-006", status: "completed", urgent: false, token: 0, patientsAhead: 0, waitTime: 0, chatResponse: "", summary: "Child fever, Paracetamol syrup prescribed.", feedback: 4 },
      { appointmentId: "APP-010", date: "2025-03-10T19:30:00.000Z", doctorId: "DOC-020", hospitalId: "HOS-001", status: "completed", urgent: false, token: 0, patientsAhead: 0, waitTime: 0, chatResponse: "", summary: "Anxiety counseling, SSRI suggested.", feedback: 5 },
    ],
    medicalEncounters: [
        { encounterId: "ENC-001", date: "2024-03-01", department: "Pulmonology", doctor: "Dr. Neha Kapoor", reason: "Follow-up for Asthma", findings: "Lungs clear, peak flow rate improved.", treatment: "Continued Salbutamol PRN, added Montelukast.", dischargeNotes: "Advised to avoid pollen.", investigations: "Spirometry" },
        { encounterId: "ENC-002", date: "2024-01-15", department: "Neurology", doctor: "Dr. Kavya Nair", reason: "Severe Headache", findings: "Classic migraine with aura.", treatment: "Prescribed Sumatriptan.", dischargeNotes: "Advised to maintain a headache diary." },
        { encounterId: "ENC-003", date: "2023-11-20", department: "Emergency", doctor: "Dr. Amit Verma", reason: "Acute Asthma Attack", findings: "Severe bronchospasm.", treatment: "Nebulization with Salbutamol and Ipratropium.", dischargeNotes: "Discharged after 4 hours of observation." , investigations: "ECG, Blood Test"},
        { encounterId: "ENC-004", date: "2023-09-10", department: "Dermatology", doctor: "Dr. S Mehra", reason: "Skin Rash", findings: "Allergic dermatitis.", treatment: "Topical steroid cream.", dischargeNotes: "Advised to use hypoallergenic products." },
    ],
    investigations: [
        { investigationId: "INV-001", date: "2024-03-01", doctor: "Dr. Neha Kapoor", type: "Spirometry", summary: "FEV1/FVC ratio of 0.75, showing mild obstructive pattern." },
        { investigationId: "INV-002", date: "2023-11-20", doctor: "Dr. Amit Verma", type: "ECG", summary: "Sinus tachycardia, rate 110 bpm." },
        { investigationId: "INV-003", date: "2023-11-20", doctor: "Dr. Amit Verma", type: "Blood Test", summary: "WBC count slightly elevated." },
        { investigationId: "INV-004", date: "2023-08-05", doctor: "Dr. A Kumar", type: "X-Ray", summary: "Chest X-ray clear, no infiltrates.", imageUrl: "https://placehold.co/600x400/000000/FFFFFF/png?text=Chest+X-Ray" },
    ],
    insurance: {
      provider: "Star Health",
      policyNumber: "SH12345678",
    },
    predictions: {
      vitalsNext7Days: {
        heartRate: [78, 79, 77, 80, 78, 79, 81],
        bloodPressure: ["121/81", "123/82", "122/80", "124/83", "123/81", "122/82", "124/82"],
      },
      medicationAdherence: [0.9, 0.95, 0.88, 0.92, 0.94, 0.89, 0.93],
      appointmentProbability: [0.2, 0.3, 0.25, 0.4, 0.35, 0.5, 0.6],
    },
    analytics: {
        vitalSigns: [
            { month: 'Apr', BP: 125, HR: 80 }, { month: 'May', BP: 122, HR: 78 },
            { month: 'Jun', BP: 124, HR: 82 }, { month: 'Jul', BP: 120, HR: 75 },
            { month: 'Aug', BP: 121, HR: 76 }, { month: 'Sep', BP: 118, HR: 72 },
        ],
        spO2: 98,
        medicalVisits: [
            { month: 'Jan', visits: 1 }, { month: 'Mar', visits: 2 },
            { month: 'Jun', visits: 1 }, { month: 'Sep', visits: 3 },
        ],
        medicationCompliance: [
            { name: 'Salbutamol', adherence: 90 },
            { name: 'Sumatriptan', adherence: 75 },
            { name: 'Montelukast', adherence: 95 },
        ],
        lifestyleScore: [
            { metric: 'Diet', score: 70 }, { metric: 'Exercise', score: 60 },
            { metric: 'Stress', score: 50 }, { metric: 'Sleep', score: 80 },
        ],
        futureRisk: {
            cardiac: { risk: 'Low', details: 'Low risk due to controlled BP and healthy lifestyle.' },
            diabetes: { risk: 'Low', details: 'No significant indicators for diabetes.' },
            stroke: { risk: 'Moderate', details: 'Migraines with aura slightly increase stroke risk. BP management is key.' },
        }
    }
  },
];
// --- END OF PATIENT INTERFACES AND DATA ---

// --- START OF DNA PATIENT INTERFACES AND DATA ---
export interface DnaPatient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  condition: string;
  geneticRisk: {
    familyHistory: string[];
    markers: { gene: string; risk: 'Low' | 'Moderate' | 'High' }[];
  };
  medication: {
    current: string;
    aiSuggestion: string;
  };
  advanced: {
    predictedDiseases: string[];
    preventiveMeasures: string[];
  };
  graphs: {
    riskProgression?: { year: string; risk: number }[];
    diseaseDistribution?: { name: string; value: number }[];
    trendData?: { month: string, value: number }[];
  };
}

export const dummyDnaPatients: DnaPatient[] = [
  {
    id: 'P1001',
    name: 'John Matthews',
    age: 45,
    gender: 'Male',
    condition: 'Diabetes Type 2',
    geneticRisk: {
      familyHistory: ['Father - Diabetes Type 2', 'Grandmother - Diabetes Type 2'],
      markers: [
        { gene: 'TCF7L2', risk: 'High' },
        { gene: 'FTO', risk: 'Moderate' },
      ],
    },
    medication: {
      current: 'Metformin',
      aiSuggestion: 'Add Dapagliflozin.',
    },
    advanced: {
      predictedDiseases: ['Diabetic Nephropathy', 'Cardiovascular Complications'],
      preventiveMeasures: ['Strict glycemic control', 'Annual kidney function tests'],
    },
    graphs: {
      trendData: [
        { month: 'Jan', value: 154 }, { month: 'Feb', value: 162 }, { month: 'Mar', value: 158 },
        { month: 'Apr', value: 170 }, { month: 'May', value: 165 }, { month: 'Jun', value: 175 }
      ],
    },
  },
  {
    id: 'P1002',
    name: 'Anita Sharma',
    age: 32,
    gender: 'Female',
    condition: 'Breast Cancer Risk',
    geneticRisk: {
      familyHistory: ['Mother - Breast Cancer'],
      markers: [{ gene: 'BRCA1', risk: 'High' }],
    },
    medication: {
      current: 'Preventive hormone therapy',
      aiSuggestion: 'Genetic counseling + AI-driven clinical trial drugs.',
    },
    advanced: {
      predictedDiseases: ['Ovarian Cancer'],
      preventiveMeasures: ['Annual mammograms', 'BRCA-related cancer screening'],
    },
    graphs: {
      diseaseDistribution: [
        { name: 'Breast Cancer', value: 70 },
        { name: 'Ovarian Cancer', value: 30 },
      ],
    },
  },
  {
    id: 'P1003',
    name: 'Liam Chen',
    age: 55,
    gender: 'Male',
    condition: 'Hypertension',
    geneticRisk: {
      familyHistory: ['Father - Hypertension', 'Mother - Hypertension'],
      markers: [
        { gene: 'ACE', risk: 'High' },
        { gene: 'AGT', risk: 'Moderate' },
      ],
    },
    medication: {
      current: 'Beta blockers',
      aiSuggestion: 'Switch to ARBs (e.g., Losartan) for better tolerance.',
    },
    advanced: {
      predictedDiseases: ['Stroke', 'Coronary Artery Disease'],
      preventiveMeasures: ['Low-sodium diet', 'Regular exercise', 'Stress management'],
    },
    graphs: {
      trendData: [
        { month: '2023-01', value: 145 }, { month: '2023-04', value: 150 }, { month: '2023-07', value: 148 },
        { month: '2023-10', value: 152 }, { month: '2024-01', value: 155 }
      ],
    },
  },
  {
    id: 'P1004',
    name: 'Sophia Rodriguez',
    age: 28,
    gender: 'Female',
    condition: 'Autoimmune (Lupus)',
    geneticRisk: {
      familyHistory: ['Maternal aunt - Lupus'],
      markers: [{ gene: 'HLA-DR3', risk: 'High' }],
    },
    medication: {
      current: 'Corticosteroids',
      aiSuggestion: 'Recommend biologics (e.g., Belimumab) to reduce steroid dependency.',
    },
    advanced: {
      predictedDiseases: ['Lupus Nephritis', 'Arthritis'],
      preventiveMeasures: ['UV protection', 'Regular renal and antibody tests'],
    },
    graphs: {
      trendData: [
        { month: 'Jan', value: 2.1 }, { month: 'Feb', value: 2.5 }, { month: 'Mar', value: 3.2 },
        { month: 'Apr', value: 2.8 }, { month: 'May', value: 3.5 }, { month: 'Jun', value: 4.1 }
      ]
    },
  },
  {
    id: 'P1005',
    name: 'Kiran Patel',
    age: 60,
    gender: 'Male',
    condition: 'Alzheimer’s Risk',
    geneticRisk: {
      familyHistory: ['Family dementia history'],
      markers: [{ gene: 'APOE-e4', risk: 'High' }],
    },
    medication: {
      current: 'Donepezil',
      aiSuggestion: 'Enroll in clinical trial for BACE inhibitors.',
    },
    advanced: {
      predictedDiseases: ['Rapid cognitive decline'],
      preventiveMeasures: ['Cognitive exercises', 'Mediterranean diet', 'Social engagement'],
    },
    graphs: {
      riskProgression: [
        { year: '2020', risk: 20 }, { year: '2021', risk: 25 }, { year: '2022', risk: 35 },
        { year: '2023', risk: 45 }, { year: '2024', risk: 55 }
      ],
    },
  },
];
// --- END OF DNA PATIENT INTERFACES AND DATA ---

// --- START OF REFERRAL PATIENT DATA ---
export const dummyReferralPatients = {
    "P1001": {
        id: "P1001",
        name: "John Matthews",
        age: 45,
        gender: "Male",
        bloodGroup: "O+",
        allergies: ["None"],
        chronicConditions: ["Type 2 Diabetes"],
        doctorsVisited: ["Dr. S Mehra (Endocrinologist)", "Dr. K Reddy (General Physician)"],
        medicines: { current: "Metformin", suggestion: "Dapagliflozin" },
        records: [
            { type: "Lab Test", name: "HbA1c", result: "6.9%", date: "2024-08-01" },
            { type: "Lab Test", name: "Fasting Sugar", result: "130 mg/dL", date: "2024-08-01" },
            { type: "Lab Test", name: "Cholesterol", result: "190 mg/dL", date: "2024-08-01" },
            { type: "Consultation", name: "Follow-up", doctor: "Dr. S Mehra", date: "2024-08-02" },
        ],
        graphs: {
            hba1cTrend: [{ name: 'Feb', value: 7.5 }, { name: 'May', value: 7.2 }, { name: 'Aug', value: 6.9 }],
            medicationAdherence: 85
        },
        aiInsights: {
            risk: "Moderate risk of cardiovascular issues due to diabetes. HbA1c trend is positive.",
            treatment: "Suggest switching to a combination therapy of Metformin and Dapagliflozin for better glycemic control.",
            prevention: "Recommend incorporating 30 minutes of daily cardio exercise."
        }
    },
    "P1002": {
        id: "P1002",
        name: "Anita Sharma",
        age: 32,
        gender: "Female",
        bloodGroup: "A+",
        allergies: ["Penicillin"],
        chronicConditions: ["BRCA1 Gene Positive"],
        doctorsVisited: ["Dr. Priya (Oncologist)"],
        medicines: { current: "Preventive Hormone Therapy", suggestion: "Consider PARP inhibitors trial" },
        records: [
            { type: "Genetic Test", name: "BRCA1/BRCA2", result: "Positive for BRCA1", date: "2023-11-10" },
            { type: "Consultation", name: "Genetic Counseling", doctor: "Dr. Vikram Singh", date: "2023-11-12" },
        ],
        graphs: {
            mutationProbability: { "Breast Cancer": 65, "Ovarian Cancer": 40 },
            medicationAdherence: 98
        },
        aiInsights: {
            risk: "High lifetime risk for breast (65%) and ovarian (40%) cancer.",
            treatment: "Continue hormone therapy. Highly recommend enrolling in PARP inhibitor clinical trials for risk reduction.",
            prevention: "Annual mammograms and transvaginal ultrasounds are crucial for early detection."
        }
    },
     "P1003": {
        id: "P1003",
        name: "Liam Chen",
        age: 55,
        gender: "Male",
        bloodGroup: "B+",
        allergies: ["None"],
        chronicConditions: ["Hypertension"],
        doctorsVisited: ["Dr. A Kumar (Cardiologist)", "Dr. T Wong (Physician)"],
        medicines: { current: "Beta Blockers", suggestion: "Switch to ARBs" },
        records: [
            { type: "ECG", name: "12-Lead ECG", result: "Normal Sinus Rhythm", date: "2024-01-15" },
            { type: "Report", name: "BP Monitoring", result: "Average 135/90 mmHg", date: "2024-07-20" },
        ],
        graphs: {
            bpTrend: [{ name: '2023', value: "160/100" }, { name: '2024', value: "130/85" }],
            medicationAdherence: 92
        },
        aiInsights: {
            risk: "Controlled hypertension, but still at risk for stroke. BP trend is positive.",
            treatment: "Patient reports side effects from Beta Blockers. ARBs like Telmisartan would be better tolerated and equally effective.",
            prevention: "Advise DASH diet and stress reduction techniques like meditation."
        }
    },
    "P1004": {
        id: "P1004",
        name: "Sophia Rodriguez",
        age: 28,
        gender: "Female",
        bloodGroup: "AB+",
        allergies: ["Gluten"],
        chronicConditions: ["Lupus (SLE)"],
        doctorsVisited: ["Dr. M Jain (Immunologist)"],
        medicines: { current: "Corticosteroids", suggestion: "Introduce Biologics" },
        records: [
            { type: "Lab Test", name: "ANA Panel", result: "Positive, Titer 1:640", date: "2024-05-01" },
            { type: "Lab Test", name: "dsDNA Antibody", result: "Elevated", date: "2024-05-01" },
        ],
        graphs: {
            antibodySpikes: [{ name: 'Jan', value: 200 }, { name: 'Mar', value: 450 }, { name: 'May', value: 300 }, { name: 'Jul', value: 550 }],
            medicationAdherence: 88
        },
        aiInsights: {
            risk: "Active Lupus with frequent flares. High risk of renal involvement.",
            treatment: "Long-term corticosteroid use is problematic. Introduce Belimumab (biologic) to target the underlying mechanism and reduce steroid dose.",
            prevention: "Strict sun protection is mandatory to prevent flares. Monitor kidney function quarterly."
        }
    },
    "P1005": {
        id: "P1005",
        name: "Kiran Patel",
        age: 60,
        gender: "Male",
        bloodGroup: "O-",
        allergies: ["None"],
        chronicConditions: ["Early Alzheimer's Markers"],
        doctorsVisited: ["Dr. R Verma (Neurologist)"],
        medicines: { current: "Donepezil", suggestion: "BACE Inhibitor Trials" },
        records: [
            { type: "Scan", name: "Brain MRI", result: "Mild hippocampal atrophy", date: "2024-02-20" },
            { type: "Report", name: "Cognitive Test (MoCA)", result: "Score 24/30", date: "2024-02-20" },
        ],
        graphs: {
            cognitiveDecline: [{ name: '2020', value: 85 }, { name: '2022', value: 75 }, { name: '2024', value: 65 }],
            medicationAdherence: 95
        },
        aiInsights: {
            risk: "Positive for APOE-e4 gene. Steady cognitive decline observed. High progression risk.",
            treatment: "Donepezil provides symptomatic relief. The most promising path is enrolling in a clinical trial for a BACE inhibitor to slow disease progression.",
            prevention: "Encourage cognitive stimulation (puzzles, reading), social engagement, and a Mediterranean diet."
        }
    }
}

export type ReferralPatient = typeof dummyReferralPatients.P1001;
// --- END OF REFERRAL PATIENT DATA ---

// --- START OF STROKE PATIENT DATA ---
export interface StrokePatient {
    id: string;
    name: string;
    age: number;
    gender: 'Male' | 'Female';
    surgery: string;
    vitals: {
        bp: string;
        heartRate: number;
        oxygen: number;
        brainActivity: string;
    };
    prediction: {
        chance: number;
        explanation: string;
        suggestion: string;
    };
    graphs: {
        riskCurve: { hour: number; risk: number }[];
    };
}

export const dummyStrokePatients: StrokePatient[] = [
    {
        id: 'P2001',
        name: 'Rajesh Kumar',
        age: 50,
        gender: 'Male',
        surgery: 'Bypass Surgery',
        vitals: { bp: '160/100', heartRate: 110, oxygen: 92, brainActivity: 'Arrhythmia' },
        prediction: {
            chance: 78,
            explanation: 'Family history of strokes, high BP, and post-surgery stress are significant contributing factors.',
            suggestion: 'Start anticoagulants immediately and maintain close ICU monitoring.'
        },
        graphs: {
            riskCurve: [
                { hour: 0, risk: 15 }, { hour: 1, risk: 25 }, { hour: 2, risk: 40 }, 
                { hour: 3, risk: 65 }, { hour: 4, risk: 78 }, { hour: 5, risk: 78 }, { hour: 6, risk: 78 }
            ]
        }
    },
    {
        id: 'P2002',
        name: 'Emily Johnson',
        age: 38,
        gender: 'Female',
        surgery: 'C-section',
        vitals: { bp: '120/80', heartRate: 75, oxygen: 98, brainActivity: 'Normal' },
        prediction: {
            chance: 12,
            explanation: 'No genetic risk factors and stable vitals indicate a low probability of stroke.',
            suggestion: 'Continue with regular post-operative monitoring.'
        },
        graphs: {
            riskCurve: [
                { hour: 0, risk: 10 }, { hour: 1, risk: 11 }, { hour: 2, risk: 12 }, 
                { hour: 3, risk: 12 }, { hour: 4, risk: 11 }, { hour: 5, risk: 12 }, { hour: 6, risk: 12 }
            ]
        }
    },
    {
        id: 'P2003',
        name: 'Hassan Ali',
        age: 65,
        gender: 'Male',
        surgery: 'Hip replacement',
        vitals: { bp: '170/110', heartRate: 95, oxygen: 89, brainActivity: 'Normal' },
        prediction: {
            chance: 91,
            explanation: 'Severe hypertension, low oxygen saturation, and abnormal clotting factors present a critical risk.',
            suggestion: 'Immediate administration of blood thinners and transfer to a high-risk monitoring unit.'
        },
        graphs: {
            riskCurve: [
                { hour: 0, risk: 30 }, { hour: 1, risk: 50 }, { hour: 2, risk: 75 }, 
                { hour: 3, risk: 88 }, { hour: 4, risk: 91 }, { hour: 5, risk: 91 }, { hour: 6, risk: 91 }
            ]
        }
    },
    {
        id: 'P2004',
        name: 'Maria Lopez',
        age: 47,
        gender: 'Female',
        surgery: 'Gallbladder Removal',
        vitals: { bp: '145/95', heartRate: 88, oxygen: 94, brainActivity: 'Mild Arrhythmia' },
        prediction: {
            chance: 48,
            explanation: 'Irregular heart rhythm combined with borderline hypertension elevates the stroke risk.',
            suggestion: 'Keep patient under close observation and consider prescribing beta-blockers to regulate heart rhythm.'
        },
        graphs: {
            riskCurve: [
                { hour: 0, risk: 20 }, { hour: 1, risk: 28 }, { hour: 2, risk: 35 }, 
                { hour: 3, risk: 42 }, { hour: 4, risk: 48 }, { hour: 5, risk: 47 }, { hour: 6, risk: 48 }
            ]
        }
    },
    {
        id: 'P2005',
        name: 'Daniel Smith',
        age: 72,
        gender: 'Male',
        surgery: 'Brain Tumor Removal',
        vitals: { bp: '180/115', heartRate: 120, oxygen: 87, brainActivity: 'Severe Arrhythmia' },
        prediction: {
            chance: 97,
            explanation: 'Critically high blood pressure, significant oxygen drop, severe arrhythmia, and a history of strokes indicate an almost certain stroke event.',
            suggestion: 'Emergency medication protocol initiated. Immediate brain scan and transfer to Stroke ICU are mandatory.'
        },
        graphs: {
            riskCurve: [
                { hour: 0, risk: 60 }, { hour: 1, risk: 80 }, { hour: 2, risk: 92 }, 
                { hour: 3, risk: 95 }, { hour: 4, risk: 97 }, { hour: 5, risk: 97 }, { hour: 6, risk: 97 }
            ]
        }
    }
];
// --- END OF STROKE PATIENT DATA ---

// --- START OF CARDIAC PATIENT DATA ---

export interface CardiacPatient {
    patientId: string;
    name: string;
    age: number;
    gender: 'Male' | 'Female';
    device: {
        type: 'Pacemaker' | 'ICD' | 'LVAD';
        model: string;
        serial: string;
        implantedDate: string;
    };
    telemetry: {
        battery: {
            percentage: number;
            voltage: number;
        };
        leadImpedance: {
            value: number;
            trend: number;
        };
        pacingThreshold: number;
        pumpFlow?: number;
        powerSpikes?: boolean;
        arrhythmiaEvents: string[];
    };
    vitals: {
        hr: number;
        bp: string;
        spo2: number;
    };
    aiPrediction: {
        risk: number;
        timeframe: string;
        explanation: string;
        suggestion: string;
    };
    location: {
        city: string;
        coordinates: {
            lat: number;
            lng: number;
        };
    };
    nearbyHospitals: {
        name: string;
        distance: string;
        tags: string[];
    }[];
    assignedDoctor: string;
}

export const dummyCardiacPatients: CardiacPatient[] = [
    {
        patientId: 'P3001',
        name: 'Rajiv Menon',
        age: 64,
        gender: 'Male',
        device: {
            type: 'Pacemaker',
            model: 'PMX-A100',
            serial: 'PMX-A-00123',
            implantedDate: '2019-06-12'
        },
        telemetry: {
            battery: { percentage: 27, voltage: 2.65 },
            leadImpedance: { value: 680, trend: 38 },
            pacingThreshold: 2.4,
            arrhythmiaEvents: ['Bradycardia episodes']
        },
        vitals: { hr: 48, bp: '100/60 mmHg', spo2: 93 },
        aiPrediction: {
            risk: 84,
            timeframe: '2h 45m',
            explanation: 'Lead impedance rose 38% in 48min; battery voltage fell to 2.65V; intermittent bradycardia noted.',
            suggestion: 'Call patient to present immediately; prepare emergency pacing; consider on-site interrogation.'
        },
        location: { city: 'Mumbai, India', coordinates: { lat: 19.0760, lng: 72.8777 } },
        nearbyHospitals: [
            { name: 'Apollo Hospitals', distance: '3.2 km', tags: ['Cardiac Cath Lab', 'ICU capacity'] },
            { name: 'Jaslok Hospital', distance: '4.7 km', tags: ['Neurointerventional available'] }
        ],
        assignedDoctor: 'Dr. S. Mehra (Cardiology)'
    },
    {
        patientId: 'P3002',
        name: 'Aisha Khan',
        age: 57,
        gender: 'Female',
        device: {
            type: 'ICD',
            model: 'ICD-Z900',
            serial: 'ICD-Z-00456',
            implantedDate: '2021-11-02'
        },
        telemetry: {
            battery: { percentage: 44, voltage: 2.8 },
            leadImpedance: { value: 950, trend: 55 },
            pacingThreshold: 1.8,
            arrhythmiaEvents: ['Frequent ventricular ectopy']
        },
        vitals: { hr: 110, bp: '140/90 mmHg', spo2: 95 },
        aiPrediction: {
            risk: 71,
            timeframe: '2h 10m',
            explanation: 'High risk of inappropriate shocks leading to arrhythmia and collapse due to lead impedance spike and ectopy.',
            suggestion: 'Initiate Tele-Eval to interrogate device remotely. Prepare for anti-arrhythmic medication.'
        },
        location: { city: 'New Delhi, India', coordinates: { lat: 28.6139, lng: 77.2090 } },
        nearbyHospitals: [
            { name: 'AIIMS Delhi', distance: '6.0 km', tags: ['Tertiary Cardiac Centre'] },
            { name: 'Max Super Speciality', distance: '4.2 km', tags: ['Cardiac ICU'] }
        ],
        assignedDoctor: 'Dr. N. Verma (Electrophysiology)'
    },
    {
        patientId: 'P3003',
        name: 'Thomas Miller',
        age: 72,
        gender: 'Male',
        device: {
            type: 'LVAD',
            model: 'LVAD-Pro V3',
            serial: 'LVAD-P-0789',
            implantedDate: '2023-02-18'
        },
        telemetry: {
            battery: { percentage: 88, voltage: 14.0 },
            leadImpedance: { value: 0, trend: 0 },
            pacingThreshold: 0,
            pumpFlow: 2.1,
            powerSpikes: true,
            arrhythmiaEvents: ['Pump flow drop detected']
        },
        vitals: { hr: 85, bp: '88/55 mmHg', spo2: 90 },
        aiPrediction: {
            risk: 93,
            timeframe: '1h 40m',
            explanation: 'Pump flow dropped from 4.5 to 2.1 L/min with power spikes, indicating imminent thrombosis or pump failure.',
            suggestion: 'CRITICAL ALERT: Auto-dispatching ambulance. Prepare for emergency VAD team intervention.'
        },
        location: { city: 'London, UK', coordinates: { lat: 51.5074, lng: -0.1278 } },
        nearbyHospitals: [
            { name: 'Royal London Hospital', distance: '5.5 km', tags: ['VAD center'] },
            { name: 'St. Thomas’ Hospital', distance: '3.8 km', tags: ['Cardiac ICU'] }
        ],
        assignedDoctor: 'Dr. L. Patel (Heart Failure/VAD specialist)'
    },
    {
        patientId: 'P3004',
        name: 'Maria Garcia',
        age: 59,
        gender: 'Female',
        device: {
            type: 'Pacemaker',
            model: 'PMX-S50',
            serial: 'PMX-S-0222',
            implantedDate: '2018-09-05'
        },
        telemetry: {
            battery: { percentage: 38, voltage: 2.75 },
            leadImpedance: { value: 550, trend: 10 },
            pacingThreshold: 3.2,
            arrhythmiaEvents: ['Intermittent loss of capture']
        },
        vitals: { hr: 52, bp: '105/70 mmHg', spo2: 94 },
        aiPrediction: {
            risk: 58,
            timeframe: '3h',
            explanation: 'Pacing threshold has jumped to 3.2V with loss of capture events. Moderate risk of symptomatic bradycardia.',
            suggestion: 'Schedule an in-person device check within 24 hours. Advise patient to report dizziness.'
        },
        location: { city: 'São Paulo, Brazil', coordinates: { lat: -23.5505, lng: -46.6333 } },
        nearbyHospitals: [
            { name: 'Hospital do Coração', distance: '2.9 km', tags: ['Cardiac emergency'] },
            { name: 'São Paulo General', distance: '5.1 km', tags: ['ICU'] }
        ],
        assignedDoctor: 'Dr. R. Oliveira (Cardiology)'
    },
    {
        patientId: 'P3005',
        name: 'Arun Shah',
        age: 68,
        gender: 'Male',
        device: {
            type: 'ICD',
            model: 'CRTD-Elite',
            serial: 'CRTD-E-3344',
            implantedDate: '2020-04-22'
        },
        telemetry: {
            battery: { percentage: 65, voltage: 2.85 },
            leadImpedance: { value: 720, trend: 5 },
            pacingThreshold: 1.5,
            arrhythmiaEvents: ['Rising atrial fibrillation burden']
        },
        vitals: { hr: 120, bp: '130/78 mmHg', spo2: 92 },
        aiPrediction: {
            risk: 76,
            timeframe: '2h 30m',
            explanation: 'High atrial fibrillation burden with borderline SpO2 and battery voltage fluctuations increases risk of arrhythmia-related collapse.',
            suggestion: 'Consider remote device adjustment to manage AF. Patient should be on alert for symptoms.'
        },
        location: { city: 'Bengaluru, India', coordinates: { lat: 12.9716, lng: 77.5946 } },
        nearbyHospitals: [
            { name: 'Fortis Hospital', distance: '6.8 km', tags: ['Cardiac Cath Lab'] },
            { name: 'Manipal Hospital', distance: '3.5 km', tags: ['Cardiac ICU'] }
        ],
        assignedDoctor: 'Dr. K. Srinivasan (Cardiac Electrophysiology)'
    }
];

// --- END OF CARDIAC PATIENT DATA ---

// --- START OF GUARDIANRX PATIENT DATA ---
export interface GuardianRxPatient {
    id: string;
    name: string;
    age: number;
    condition: string;
    adherence: number;
    lastDose: string;
    adherenceHistory: ('taken' | 'late' | 'missed')[];
    risk: {
        level: 'Safe' | 'Caution' | 'Critical';
        details: string;
    };
    digitalTwin: {
        organ: 'Heart' | 'Brain' | 'Lungs' | 'Liver' | 'Kidneys';
        vitals: {
            hr: number;
            bp: string;
            glucose?: number;
            cholesterol?: number;
        };
        prediction: string;
    };
}

export const dummyGuardianRxPatients: GuardianRxPatient[] = [
    {
        id: 'GRX-001',
        name: 'Sanjay Sharma',
        age: 45,
        condition: 'Hypertension',
        adherence: 92,
        lastDose: '08:00 AM',
        adherenceHistory: ['taken', 'taken', 'taken', 'taken', 'taken', 'taken', 'taken'],
        risk: { level: 'Safe', details: 'Mild risk if next dose is missed.' },
        digitalTwin: {
            organ: 'Heart',
            vitals: { hr: 75, bp: '125/85' },
            prediction: 'Missing a dose may elevate BP to 140/90 mmHg.'
        }
    },
    {
        id: 'GRX-002',
        name: 'Priya Verma',
        age: 32,
        condition: 'Diabetes',
        adherence: 85,
        lastDose: '07:30 AM',
        adherenceHistory: ['taken', 'taken', 'late', 'taken', 'taken', 'taken', 'late'],
        risk: { level: 'Caution', details: 'Risk of hyperglycemia.' },
        digitalTwin: {
            organ: 'Kidneys',
            vitals: { hr: 80, bp: '120/80', glucose: 160 },
            prediction: 'Two missed doses could raise glucose to 220 mg/dL.'
        }
    },
    {
        id: 'GRX-003',
        name: 'Rohit Kumar',
        age: 60,
        condition: 'Heart Disease',
        adherence: 70,
        lastDose: '08:15 AM',
        adherenceHistory: ['taken', 'missed', 'missed', 'taken', 'taken', 'missed', 'taken'],
        risk: { level: 'Critical', details: 'Risk of arrhythmia.' },
        digitalTwin: {
            organ: 'Heart',
            vitals: { hr: 95, bp: '135/88' },
            prediction: 'High probability of atrial fibrillation if next dose is missed.'
        }
    },
    {
        id: 'GRX-004',
        name: 'Ananya Singh',
        age: 28,
        condition: 'Thyroid',
        adherence: 100,
        lastDose: '08:05 AM',
        adherenceHistory: ['taken', 'taken', 'taken', 'taken', 'taken', 'taken', 'taken'],
        risk: { level: 'Safe', details: 'Fully compliant.' },
        digitalTwin: {
            organ: 'Brain',
            vitals: { hr: 70, bp: '110/70' },
            prediction: 'No immediate risk. Continued adherence is key.'
        }
    },
    {
        id: 'GRX-005',
        name: 'Vikram Joshi',
        age: 50,
        condition: 'Cholesterol',
        adherence: 78,
        lastDose: '07:45 AM',
        adherenceHistory: ['taken', 'taken', 'missed', 'late', 'taken', 'missed', 'taken'],
        risk: { level: 'Caution', details: 'Risk of plaque formation.' },
        digitalTwin: {
            organ: 'Liver',
            vitals: { hr: 72, bp: '128/82', cholesterol: 220 },
            prediction: 'Consistent misses may increase LDL by 15%.'
        }
    }
];

// --- END OF GUARDIANRX PATIENT DATA ---
