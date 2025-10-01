
export const dummyDoctors = [
    {
      "doctorId": "DOC-001",
      "name": "Dr. Asha Rao",
      "specialty": "General Physician",
      "hospitalId": "HOS-001",
      "contact": "+919876543210",
      "waitTime": "15 mins"
    },
    {
      "doctorId": "DOC-002",
      "name": "Dr. Neha Singh",
      "specialty": "Gynecologist",
      "hospitalId": "HOS-002",
      "contact": "+919876543211",
      "waitTime": "30 mins"
    },
    {
      "doctorId": "DOC-003",
      "name": "Dr. Priya Desai",
      "specialty": "Endocrinologist",
      "hospitalId": "HOS-003",
      "contact": "+919876543212",
      "waitTime": "20 mins"
    },
    {
      "doctorId": "DOC-004",
      "name": "Dr. Rahul Mehra",
      "specialty": "Cardiologist",
      "hospitalId": "HOS-004",
      "contact": "+919876543213",
      "waitTime": "45 mins"
    },
    {
      "doctorId": "DOC-005",
      "name": "Dr. Alok Gupta",
      "specialty": "Orthopedic Surgeon",
      "hospitalId": "HOS-003",
      "contact": "+919876543214",
      "waitTime": "25 mins"
    }
]

export const dummyHospitals = [
    {
        "hospitalId": "HOS-001",
        "name": "Starlight General Hospital",
        "location": "Mumbai, MH",
        "contact": "+912226206666",
        "patientLoad": "High",
        "coordinates": {"lat": 19.0760, "lng": 72.8777}
    },
    {
        "hospitalId": "HOS-002",
        "name": "CityCare Hospital",
        "location": "Delhi, DL",
        "contact": "+911145678901",
        "patientLoad": "Medium",
        "coordinates": {"lat": 28.7041, "lng": 77.1025}
    },
    {
        "hospitalId": "HOS-003",
        "name": "Apollo Health City",
        "location": "Hyderabad, TS",
        "contact": "+914023607777",
        "patientLoad": "High",
        "coordinates": {"lat": 17.3850, "lng": 78.4867}
    },
    {
        "hospitalId": "HOS-004",
        "name": "Heartbeat Institute",
        "location": "Bangalore, KA",
        "contact": "+918022221111",
        "patientLoad": "Low",
        "coordinates": {"lat": 12.9716, "lng": 77.5946}
    },
    {
        "hospitalId": "HOS-005",
        "name": "Evergreen Wellness Center",
        "location": "Pune, MH",
        "contact": "+912066066606",
        "patientLoad": "Medium",
        "coordinates": {"lat": 18.5204, "lng": 73.8567}
    }
]

export const dummyMedicines = [
    {"medicineId": "MED-001", "name": "Amlodipine", "composition": "Amlodipine Besylate 5mg", "costGovt": 5, "costPrivate": 25},
    {"medicineId": "MED-002", "name": "Metformin", "composition": "Metformin Hydrochloride 500mg", "costGovt": 3, "costPrivate": 15},
    {"medicineId": "MED-003", "name": "Aspirin", "composition": "Aspirin 75mg", "costGovt": 1, "costPrivate": 10},
    {"medicineId": "MED-004", "name": "Atorvastatin", "composition": "Atorvastatin Calcium 10mg", "costGovt": 8, "costPrivate": 50},
    {"medicineId": "MED-005", "name": "Levothyroxine", "composition": "Levothyroxine Sodium 50mcg", "costGovt": 10, "costPrivate": 60},
    {"medicineId": "MED-006", "name": "Paracetamol", "composition": "Paracetamol 500mg", "costGovt": 2, "costPrivate": 12},
    {"medicineId": "MED-007", "name": "Cetirizine", "composition": "Cetirizine Hydrochloride 10mg", "costGovt": 4, "costPrivate": 20},
    {"medicineId": "MED-008", "name": "Omeprazole", "composition": "Omeprazole 20mg", "costGovt": 6, "costPrivate": 35},
    {"medicineId": "MED-009", "name": "Salbutamol Inhaler", "composition": "Salbutamol Sulphate 100mcg", "costGovt": 50, "costPrivate": 250},
    {"medicineId": "MED-010", "name": "Ibuprofen", "composition": "Ibuprofen 400mg", "costGovt": 5, "costPrivate": 30},
    {"medicineId": "MED-011", "name": "D-Rise", "composition": "Cholecalciferol 60000IU", "costGovt": 20, "costPrivate": 100},
    {"medicineId": "MED-012", "name": "Sumatriptan", "composition": "Sumatriptan Succinate 50mg", "costGovt": 15, "costPrivate": 80},
    {"medicineId": "MED-013", "name": "Clopidogrel", "composition": "Clopidogrel Bisulfate 75mg", "costGovt": 12, "costPrivate": 70},
    {"medicineId": "MED-014", "name": "Myo-Inositol", "composition": "Myo-Inositol 1000mg", "costGovt": 30, "costPrivate": 150},
    {"medicineId": "MED-015", "name": "Iron Folic Acid", "composition": "Ferrous Ascorbate 100mg, Folic Acid 1.5mg", "costGovt": 7, "costPrivate": 40},
];

export const dummyAmbulances = [
  {"id": "AMB-001", "vehicle_no": "MH-12-AB-1234", "driver_name": "Ravi Kumar", "driver_phone": "+919876500001", "status": "available", "current_coords": {"lat": 19.0860, "lng": 72.8877}, "speed_kmph": 60, "hospital_id": "HOS-001"},
  {"id": "AMB-002", "vehicle_no": "DL-3C-CD-5678", "driver_name": "Suresh Patel", "driver_phone": "+919876500002", "status": "available", "current_coords": {"lat": 28.7141, "lng": 77.1125}, "speed_kmph": 50, "hospital_id": "HOS-002"},
  {"id": "AMB-003", "vehicle_no": "TS-09-EF-9012", "driver_name": "Anil Yadav", "driver_phone": "+919876500003", "status": "on-trip", "current_coords": {"lat": 17.4050, "lng": 78.4967}, "speed_kmph": 70, "hospital_id": "HOS-003"},
  {"id": "AMB-004", "vehicle_no": "KA-01-GH-3456", "driver_name": "Sunil Reddy", "driver_phone": "+919876500004", "status": "available", "current_coords": {"lat": 12.9816, "lng": 77.6046}, "speed_kmph": 55, "hospital_id": "HOS-004"},
  {"id": "AMB-005", "vehicle_no": "MH-14-IJ-7890", "driver_name": "Vijay Singh", "driver_phone": "+919876500005", "status": "offline", "current_coords": {"lat": 18.5304, "lng": 73.8667}, "speed_kmph": 0, "hospital_id": "HOS-005"},
  {"id": "AMB-006", "vehicle_no": "MH-12-KL-2468", "driver_name": "Deepak Sharma", "driver_phone": "+919876500006", "status": "available", "current_coords": {"lat": 19.0660, "lng": 72.8677}, "speed_kmph": 45, "hospital_id": "HOS-001"},
  {"id": "AMB-007", "vehicle_no": "DL-3C-MN-1357", "driver_name": "Manoj Tiwari", "driver_phone": "+919876500007", "status": "on-trip", "current_coords": {"lat": 28.6941, "lng": 77.0925}, "speed_kmph": 65, "hospital_id": "HOS-002"},
  {"id": "AMB-008", "vehicle_no": "TS-09-OP-8642", "driver_name": "Rajesh Gupta", "driver_phone": "+919876500008", "status": "available", "current_coords": {"lat": 17.3750, "lng": 78.4767}, "speed_kmph": 58, "hospital_id": "HOS-003"},
  {"id": "AMB-009", "vehicle_no": "KA-01-QR-9753", "driver_name": "Naveen Gowda", "driver_phone": "+919876500009", "status": "offline", "current_coords": {"lat": 12.9616, "lng": 77.5846}, "speed_kmph": 0, "hospital_id": "HOS-004"},
  {"id": "AMB-010", "vehicle_no": "MH-14-ST-1928", "driver_name": "Prakash Joshi", "driver_phone": "+919876500010", "status": "available", "current_coords": {"lat": 18.5104, "lng": 73.8467}, "speed_kmph": 52, "hospital_id": "HOS-005"}
];

export const dummyPatients = [
  {
    "patientId": "PAT-20251001-0001",
    "name": "Rohit Sharma",
    "phone": "+919999900001",
    "dob": "1988-03-15",
    "gender": "Male",
    "aadhaar": "XXXX-XXXX-1234",
    "address": "123, Marine Drive, Mumbai, MH",
    "bloodGroup": "O+",
    "medicalSummary": "Hypertension, Allergic to Penicillin",
    "emergencyContact": { "name": "Priya Sharma", "phone": "+919888800001" },
    "insurance": { "policyId": "INS-A01", "provider": "Star Health", "startDate": "2024-01-01", "endDate": "2025-01-01", "termsUrl": "#" },
    "vitals": {
      "heartRate": [72, 75, 78, 74, 73, 76, 77],
      "bloodPressure": ["120/80","122/82","121/81","119/79","118/78","120/80","121/81"],
      "bloodSugar": [95, 98, 100, 97, 96, 99, 101],
      "oxygenSaturation": [98, 97, 97, 98, 98, 97, 98]
    },
    "appointments": [
      {"appointmentId": "APP-001", "date": "2025-10-05", "doctorId": "DOC-001", "hospitalId": "HOS-001", "status": "booked"},
      {"appointmentId": "APP-002", "date": "2025-10-15", "doctorId": "DOC-002", "hospitalId": "HOS-002", "status": "booked", "urgent": true}
    ],
    "predictions": {
      "vitalsNext7Days": {"heartRate": [73,74,75,76,75,74,73], "bloodPressure": ["121/80","122/81","120/79","121/80","122/81","120/79","121/80"]},
      "appointmentProbability": [0.8,0.7,0.9,0.6,0.75,0.85,0.9],
      "medicationAdherence": [0.95,0.97,0.93,0.96,0.94,0.95,0.96]
    },
    "medicalRecords": [
        {"recordId": "REC-001", "date": "2025-09-20", "type": "Consultation", "details": "Routine checkup. BP slightly elevated.", "doctorId": "DOC-001"},
        {"recordId": "REC-002", "date": "2025-07-11", "type": "Lab Test", "details": "Lipid profile. Results normal.", "doctorId": "DOC-001"},
        {"recordId": "REC-003", "date": "2025-05-02", "type": "Procedure", "details": "Prescribed Amlodipine for hypertension.", "doctorId": "DOC-001"}
    ],
    "prescriptions": [
        {"prescriptionId": "PRE-001", "date": "2025-05-02", "doctorId": "DOC-001", "medicines": [{"medicineId": "MED-001", "dosage": "5mg OD"}]}
    ],
    "radiologyReports": [
        {"reportId": "RAD-001", "date": "2024-11-10", "type": "Chest X-Ray", "summary": "Lungs are clear. No abnormalities detected.", "imageUrl": "https://picsum.photos/seed/rad1/600/400"}
    ]
  },
  {
    "patientId": "PAT-20251001-0002",
    "name": "Anjali Verma",
    "phone": "+919999900002",
    "dob": "1992-08-20",
    "gender": "Female",
    "aadhaar": "XXXX-XXXX-2345",
    "address": "45, GK-1, New Delhi, DL",
    "bloodGroup": "A+",
    "medicalSummary": "Asthma, Vitamin D deficiency",
    "emergencyContact": { "name": "Rohan Verma", "phone": "+919888800002" },
    "insurance": { "policyId": "INS-B02", "provider": "ICICI Lombard", "startDate": "2023-06-01", "endDate": "2024-06-01", "termsUrl": "#" },
    "vitals": {
      "heartRate": [78, 80, 77, 79, 78, 80, 81],
      "bloodPressure": ["118/76","120/78","119/77","118/76","119/77","120/78","121/79"],
      "bloodSugar": [90, 92, 91, 93, 92, 94, 95],
      "oxygenSaturation": [96, 97, 96, 95, 97, 96, 97]
    },
    "appointments": [
      {"appointmentId": "APP-003", "date": "2025-10-07", "doctorId": "DOC-002", "hospitalId": "HOS-002", "status": "booked"}
    ],
    "predictions": {
      "vitalsNext7Days": {"heartRate": [79,78,80,81,79,78,80], "bloodPressure": ["119/77","120/78","118/76","119/77","120/78","119/77","118/76"]},
      "appointmentProbability": [0.85,0.8,0.75,0.9,0.85,0.8,0.9],
      "medicationAdherence": [0.97,0.96,0.95,0.98,0.97,0.96,0.97]
    },
    "medicalRecords": [
        {"recordId": "REC-004", "date": "2025-09-15", "type": "Consultation", "details": "Follow-up for Asthma. Inhaler dosage adjusted.", "doctorId": "DOC-005"},
        {"recordId": "REC-005", "date": "2025-08-01", "type": "Procedure", "details": "Prescribed Salbutamol Inhaler and Vitamin D supplements.", "doctorId": "DOC-005"}
    ],
    "prescriptions": [
        {"prescriptionId": "PRE-002", "date": "2025-08-01", "doctorId": "DOC-005", "medicines": [{"medicineId": "MED-009", "dosage": "2 puffs when needed"}, {"medicineId": "MED-011", "dosage": "1 tablet weekly"}]}
    ],
    "radiologyReports": []
  },
  {
    "patientId": "PAT-20251001-0003",
    "name": "Vikram Singh",
    "phone": "+919999900003",
    "dob": "1975-11-30",
    "gender": "Male",
    "aadhaar": "XXXX-XXXX-3456",
    "address": "789, Jubilee Hills, Hyderabad, TS",
    "bloodGroup": "B+",
    "medicalSummary": "Type 2 Diabetes, on Metformin",
    "emergencyContact": { "name": "Sunita Singh", "phone": "+919888800003" },
    "insurance": { "policyId": "INS-C03", "provider": "HDFC Ergo", "startDate": "2024-03-15", "endDate": "2025-03-15", "termsUrl": "#" },
    "vitals": {
      "heartRate": [82, 85, 81, 83, 84, 82, 83],
      "bloodPressure": ["130/85","132/86","129/84","131/85","130/84","132/86","133/87"],
      "bloodSugar": [140, 145, 138, 150, 142, 148, 146],
      "oxygenSaturation": [99, 98, 99, 98, 99, 98, 99]
    },
    "appointments": [
      {"appointmentId": "APP-004", "date": "2025-10-10", "doctorId": "DOC-003", "hospitalId": "HOS-003", "status": "booked"},
      {"appointmentId": "APP-005", "date": "2025-11-01", "doctorId": "DOC-003", "hospitalId": "HOS-003", "status": "booked", "urgent": true}
    ],
    "predictions": {
      "vitalsNext7Days": {"heartRate": [83,84,82,83,85,84,83], "bloodPressure": ["131/85","130/84","132/86","133/87","131/85","130/84","132/86"]},
      "appointmentProbability": [0.7,0.65,0.75,0.8,0.7,0.75,0.8],
      "medicationAdherence": [0.92,0.9,0.94,0.91,0.93,0.92,0.9]
    },
    "medicalRecords": [
        {"recordId": "REC-006", "date": "2025-08-10", "type": "Consultation", "details": "Diabetes management review. Adjusted Metformin dosage.", "doctorId": "DOC-003"}
    ],
     "prescriptions": [
        {"prescriptionId": "PRE-003", "date": "2025-08-10", "doctorId": "DOC-003", "medicines": [{"medicineId": "MED-002", "dosage": "500mg BD"}]}
    ],
    "radiologyReports": []
  },
  {
    "patientId": "PAT-20251001-0004",
    "name": "Priya Kapoor",
    "phone": "+919999900004",
    "dob": "2001-01-25",
    "gender": "Female",
    "aadhaar": "XXXX-XXXX-4567",
    "address": "101, Indiranagar, Bangalore, KA",
    "bloodGroup": "AB+",
    "medicalSummary": "No significant history. Generally healthy.",
    "emergencyContact": { "name": "Anil Kapoor", "phone": "+919888800004" },
    "insurance": { "policyId": "INS-D04", "provider": "Bajaj Allianz", "startDate": "2023-11-01", "endDate": "2024-11-01", "termsUrl": "#" },
    "vitals": {
      "heartRate": [68, 70, 69, 71, 70, 69, 72],
      "bloodPressure": ["110/70","112/72","111/71","110/70","112/72","111/71","113/73"],
      "bloodSugar": [85, 88, 86, 87, 85, 89, 90],
      "oxygenSaturation": [99, 99, 98, 99, 99, 99, 99]
    },
    "appointments": [
      {"appointmentId": "APP-006", "date": "2026-01-20", "doctorId": "DOC-001", "hospitalId": "HOS-001", "status": "booked"}
    ],
    "predictions": {
      "vitalsNext7Days": {"heartRate": [70,71,70,69,72,71,70], "bloodPressure": ["111/71","110/70","112/72","111/71","113/73","112/72","110/70"]},
      "appointmentProbability": [0.1,0.1,0.1,0.1,0.1,0.1,0.1],
      "medicationAdherence": [1,1,1,1,1,1,1]
    },
    "medicalRecords": [
         {"recordId": "REC-007", "date": "2025-01-20", "type": "Consultation", "details": "Annual physical exam. All clear.", "doctorId": "DOC-001"}
    ],
    "prescriptions": [],
    "radiologyReports": []
  },
  {
    "patientId": "PAT-20251001-0005",
    "name": "Sanjay Gupta",
    "phone": "+919999900005",
    "dob": "1965-06-12",
    "gender": "Male",
    "aadhaar": "XXXX-XXXX-5678",
    "address": "22, Koramangala, Bangalore, KA",
    "bloodGroup": "O-",
    "medicalSummary": "Coronary Artery Disease, post-stent.",
    "emergencyContact": { "name": "Meena Gupta", "phone": "+919888800005" },
    "insurance": { "policyId": "INS-E05", "provider": "Care Health", "startDate": "2024-05-20", "endDate": "2025-05-20", "termsUrl": "#" },
    "vitals": {
      "heartRate": [65, 66, 64, 67, 65, 66, 68],
      "bloodPressure": ["125/82","126/83","124/81","127/84","125/82","126/83","128/84"],
      "bloodSugar": [110, 112, 109, 115, 111, 114, 113],
      "oxygenSaturation": [97, 98, 97, 98, 97, 98, 97]
    },
    "appointments": [
      {"appointmentId": "APP-007", "date": "2025-10-25", "doctorId": "DOC-004", "hospitalId": "HOS-004", "status": "booked", "urgent": true}
    ],
    "predictions": {
      "vitalsNext7Days": {"heartRate": [66,65,67,68,66,65,67], "bloodPressure": ["126/83","125/82","127/84","128/84","126/83","125/82","127/84"]},
      "appointmentProbability": [0.9,0.9,0.9,0.9,0.9,0.9,0.9],
      "medicationAdherence": [0.98,0.99,0.97,0.98,0.99,0.98,0.97]
    },
    "medicalRecords": [
      {"recordId": "REC-008", "date": "2025-04-15", "type": "Procedure", "details": "Coronary angioplasty with stent placement.", "doctorId": "DOC-004"},
      {"recordId": "REC-009", "date": "2025-04-15", "type": "Procedure", "details": "Prescribed Aspirin and Clopidogrel.", "doctorId": "DOC-004"}
    ],
    "prescriptions": [
        {"prescriptionId": "PRE-004", "date": "2025-04-15", "doctorId": "DOC-004", "medicines": [{"medicineId": "MED-003", "dosage": "75mg OD"}, {"medicineId": "MED-013", "dosage": "75mg OD"}]}
    ],
    "radiologyReports": []
  },
  {
    "patientId": "PAT-20251001-0006",
    "name": "Meera Iyer",
    "phone": "+919999900006",
    "dob": "1998-09-05",
    "gender": "Female",
    "aadhaar": "XXXX-XXXX-6789",
    "address": "33, Alwarpet, Chennai, TN",
    "bloodGroup": "B-",
    "medicalSummary": "Migraines, occasional Iron deficiency.",
    "emergencyContact": { "name": "Suresh Iyer", "phone": "+919888800006" },
    "insurance": { "policyId": "INS-F06", "provider": "New India Assurance", "startDate": "2023-08-01", "endDate": "2024-08-01", "termsUrl": "#" },
    "vitals": {
      "heartRate": [74, 76, 75, 77, 76, 75, 78],
      "bloodPressure": ["115/75","116/76","114/74","117/77","115/75","116/76","118/78"],
      "bloodSugar": [92, 94, 93, 95, 94, 96, 97],
      "oxygenSaturation": [98, 99, 98, 99, 98, 99, 98]
    },
    "appointments": [
      {"appointmentId": "APP-008", "date": "2025-10-12", "doctorId": "DOC-002", "hospitalId": "HOS-002", "status": "booked"}
    ],
    "predictions": {
      "vitalsNext7Days": {"heartRate": [76,75,77,78,76,75,77], "bloodPressure": ["116/76","115/75","117/77","118/78","116/76","115/75","117/77"]},
      "appointmentProbability": [0.4,0.3,0.5,0.4,0.3,0.5,0.4],
      "medicationAdherence": [0.99,0.98,1,0.99,0.98,1,0.99]
    },
     "medicalRecords": [
        {"recordId": "REC-010", "date": "2025-06-30", "type": "Consultation", "details": "Consulted for severe migraine episode.", "doctorId": "DOC-002"}
    ],
    "prescriptions": [
        {"prescriptionId": "PRE-005", "date": "2025-06-30", "doctorId": "DOC-002", "medicines": [{"medicineId": "MED-012", "dosage": "50mg as needed"}, {"medicineId": "MED-015", "dosage": "1 tablet OD"}]}
    ],
    "radiologyReports": []
  },
  {
    "patientId": "PAT-20251001-0007",
    "name": "Arjun Reddy",
    "phone": "+919999900007",
    "dob": "1990-07-18",
    "gender": "Male",
    "aadhaar": "XXXX-XXXX-7890",
    "address": "44, Banjara Hills, Hyderabad, TS",
    "bloodGroup": "AB-",
    "medicalSummary": "ACL tear recovery (left knee).",
    "emergencyContact": { "name": "Prakash Reddy", "phone": "+919888800007" },
    "insurance": { "policyId": "INS-G07", "provider": "United India Insurance", "startDate": "2024-02-10", "endDate": "2025-02-10", "termsUrl": "#" },
    "vitals": {
      "heartRate": [70, 72, 71, 73, 72, 74, 75],
      "bloodPressure": ["122/80","123/81","121/79","124/82","122/80","123/81","125/83"],
      "bloodSugar": [98, 100, 99, 102, 101, 103, 104],
      "oxygenSaturation": [99, 98, 99, 98, 99, 98, 99]
    },
    "appointments": [
      {"appointmentId": "APP-009", "date": "2025-10-20", "doctorId": "DOC-005", "hospitalId": "HOS-003", "status": "booked"}
    ],
    "predictions": {
      "vitalsNext7Days": {"heartRate": [72,73,72,74,75,73,72], "bloodPressure": ["123/81","122/80","124/82","125/83","123/81","122/80","124/82"]},
      "appointmentProbability": [0.6,0.6,0.6,0.6,0.6,0.6,0.6],
      "medicationAdherence": [1,1,1,1,1,1,1]
    },
    "medicalRecords": [
      {"recordId": "REC-011", "date": "2025-03-01", "type": "Surgery", "details": "ACL reconstruction surgery, left knee.", "doctorId": "DOC-005"}
    ],
    "prescriptions": [],
    "radiologyReports": [
        {"reportId": "RAD-002", "date": "2025-02-15", "type": "MRI Knee", "summary": "Post-operative changes of ACL reconstruction. No new tear.", "imageUrl": "https://picsum.photos/seed/rad2/600/400"}
    ]
  },
  {
    "patientId": "PAT-20251001-0008",
    "name": "Sunita Rao",
    "phone": "+919999900008",
    "dob": "1958-04-22",
    "gender": "Female",
    "aadhaar": "XXXX-XXXX-8901",
    "address": "55, Jayanagar, Bangalore, KA",
    "bloodGroup": "A-",
    "medicalSummary": "Osteoporosis, Hypothyroidism.",
    "emergencyContact": { "name": "Kiran Rao", "phone": "+919888800008" },
    "insurance": { "policyId": "INS-H08", "provider": "Oriental Insurance", "startDate": "2023-12-01", "endDate": "2024-12-01", "termsUrl": "#" },
    "vitals": {
      "heartRate": [76, 78, 77, 79, 78, 80, 81],
      "bloodPressure": ["135/88","136/89","134/87","137/90","135/88","136/89","138/91"],
      "bloodSugar": [105, 107, 106, 108, 107, 109, 110],
      "oxygenSaturation": [96, 97, 96, 97, 96, 97, 96]
    },
    "appointments": [
      {"appointmentId": "APP-010", "date": "2025-10-18", "doctorId": "DOC-003", "hospitalId": "HOS-001", "status": "booked"},
      {"appointmentId": "APP-011", "date": "2025-12-18", "doctorId": "DOC-003", "hospitalId": "HOS-001", "status": "booked", "urgent": true}
    ],
    "predictions": {
      "vitalsNext7Days": {"heartRate": [78,79,78,80,81,79,78], "bloodPressure": ["136/89","135/88","137/90","138/91","136/89","135/88","137/90"]},
      "appointmentProbability": [0.8,0.8,0.8,0.8,0.8,0.8,0.8],
      "medicationAdherence": [0.95,0.96,0.94,0.95,0.96,0.94,0.95]
    },
    "medicalRecords": [
        {"recordId": "REC-012", "date": "2025-09-01", "type": "Lab Test", "details": "TSH levels check. Dosage adjusted.", "doctorId": "DOC-003"}
    ],
    "prescriptions": [
        {"prescriptionId": "PRE-006", "date": "2025-09-01", "doctorId": "DOC-003", "medicines": [{"medicineId": "MED-005", "dosage": "75mcg OD"}]}
    ],
    "radiologyReports": []
  },
  {
    "patientId": "PAT-20251001-0009",
    "name": "Karan Malhotra",
    "phone": "+919999900009",
    "dob": "1982-12-01",
    "gender": "Male",
    "aadhaar": "XXXX-XXXX-9012",
    "address": "66, Viman Nagar, Pune, MH",
    "bloodGroup": "O+",
    "medicalSummary": "GERD, seasonal allergies.",
    "emergencyContact": { "name": "Neha Malhotra", "phone": "+919888800009" },
    "insurance": { "policyId": "INS-I09", "provider": "Acko General Insurance", "startDate": "2024-07-15", "endDate": "2025-07-15", "termsUrl": "#" },
    "vitals": {
      "heartRate": [71, 73, 72, 74, 73, 75, 74],
      "bloodPressure": ["124/81","125/82","123/80","126/83","124/81","125/82","126/83"],
      "bloodSugar": [99, 101, 100, 102, 101, 103, 102],
      "oxygenSaturation": [98, 97, 98, 97, 98, 97, 98]
    },
    "appointments": [
      {"appointmentId": "APP-012", "date": "2025-10-22", "doctorId": "DOC-001", "hospitalId": "HOS-002", "status": "booked"}
    ],
    "predictions": {
      "vitalsNext7Days": {"heartRate": [73,72,74,75,73,74,73], "bloodPressure": ["125/82","124/81","126/83","126/83","125/82","124/81","126/83"]},
      "appointmentProbability": [0.5,0.5,0.5,0.5,0.5,0.5,0.5],
      "medicationAdherence": [0.9,0.88,0.92,0.9,0.89,0.91,0.9]
    },
    "medicalRecords": [
        {"recordId": "REC-013", "date": "2025-08-22", "type": "Consultation", "details": "Prescribed medication for GERD flare-up.", "doctorId": "DOC-001"}
    ],
    "prescriptions": [
        {"prescriptionId": "PRE-007", "date": "2025-08-22", "doctorId": "DOC-001", "medicines": [{"medicineId": "MED-008", "dosage": "20mg OD"}, {"medicineId": "MED-007", "dosage": "10mg as needed"}]}
    ],
    "radiologyReports": []
  },
  {
    "patientId": "PAT-20251001-0010",
    "name": "Deepa Khanna",
    "phone": "+919999900010",
    "dob": "1995-02-14",
    "gender": "Female",
    "aadhaar": "XXXX-XXXX-0123",
    "address": "77, Bandra West, Mumbai, MH",
    "bloodGroup": "B+",
    "medicalSummary": "PCOS, under observation.",
    "emergencyContact": { "name": "Raj Khanna", "phone": "+919888800010" },
    "insurance": { "policyId": "INS-J10", "provider": "Digit Insurance", "startDate": "2024-09-01", "endDate": "2025-09-01", "termsUrl": "#" },
    "vitals": {
      "heartRate": [75, 77, 76, 78, 77, 79, 78],
      "bloodPressure": ["117/76","118/77","116/75","119/78","117/76","118/77","120/79"],
      "bloodSugar": [94, 96, 95, 97, 96, 98, 99],
      "oxygenSaturation": [99, 98, 99, 98, 99, 98, 99]
    },
    "appointments": [
      {"appointmentId": "APP-013", "date": "2025-11-10", "doctorId": "DOC-002", "hospitalId": "HOS-001", "status": "booked"}
    ],
    "predictions": {
      "vitalsNext7Days": {"heartRate": [77,76,78,79,77,78,77], "bloodPressure": ["118/77","117/76","119/78","120/79","118/77","117/76","119/78"]},
      "appointmentProbability": [0.65,0.7,0.6,0.75,0.65,0.7,0.6],
      "medicationAdherence": [0.99,0.99,1,0.98,0.99,1,0.99]
    },
    "medicalRecords": [
        {"recordId": "REC-014", "date": "2025-09-10", "type": "Ultrasound", "details": "Pelvic ultrasound for PCOS monitoring. Results stable.", "doctorId": "DOC-002"}
    ],
    "prescriptions": [],
    "radiologyReports": []
  }
];

export type Patient = typeof dummyPatients[0];
export type Doctor = typeof dummyDoctors[0];
export type Hospital = typeof dummyHospitals[0];
export type Medicine = typeof dummyMedicines[0];
export type Ambulance = typeof dummyAmbulances[0];
