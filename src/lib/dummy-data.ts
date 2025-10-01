
export const dummyPatients = [
  {
    "patientId": "PAT-20251001-0001",
    "name": "Rohit Sharma",
    "phone": "+919999900001",
    "dob": "1988-03-15",
    "gender": "Male",
    "medicalSummary": "Hypertension, Allergic to Penicillin",
    "emergencyContact": "+919888800001",
    "vitals": {
      "heartRate": [72, 75, 78, 74, 73, 76, 77],
      "bloodPressure": ["120/80","122/82","121/81","119/79","118/78","120/80","121/81"],
      "bloodSugar": [95, 98, 100, 97, 96, 99, 101],
      "oxygenSaturation": [98, 97, 97, 98, 98, 97, 98]
    },
    "appointments": [
      {"date": "2025-10-05", "doctor": "Dr. Asha Rao", "hospital": "Starlight General Hospital", "status": "booked"},
      {"date": "2025-10-15", "doctor": "Dr. Neha Singh", "hospital": "CityCare Hospital", "status": "booked", "urgent": true}
    ],
    "predictions": {
      "vitalsNext7Days": {"heartRate": [73,74,75,76,75,74,73], "bloodPressure": ["121/80","122/81","120/79","121/80","122/81","120/79","121/80"]},
      "appointmentProbability": [0.8,0.7,0.9,0.6,0.75,0.85,0.9],
      "medicationAdherence": [0.95,0.97,0.93,0.96,0.94,0.95,0.96]
    },
    "medicalRecords": [
        {"date": "2025-09-20", "type": "Consultation", "details": "Routine checkup. BP slightly elevated.", "doctor": "Dr. Asha Rao"},
        {"date": "2025-07-11", "type": "Lab Test", "details": "Lipid profile. Results normal.", "doctor": "Lab"},
        {"date": "2025-05-02", "type": "Prescription", "details": "Prescribed Amlodipine for hypertension.", "doctor": "Dr. Asha Rao"}
    ]
  },
  {
    "patientId": "PAT-20251001-0002",
    "name": "Anjali Verma",
    "phone": "+919999900002",
    "dob": "1992-08-20",
    "gender": "Female",
    "medicalSummary": "Asthma, Vitamin D deficiency",
    "emergencyContact": "+919888800002",
    "vitals": {
      "heartRate": [78, 80, 77, 79, 78, 80, 81],
      "bloodPressure": ["118/76","120/78","119/77","118/76","119/77","120/78","121/79"],
      "bloodSugar": [90, 92, 91, 93, 92, 94, 95],
      "oxygenSaturation": [96, 97, 96, 95, 97, 96, 97]
    },
    "appointments": [
      {"date": "2025-10-07", "doctor": "Dr. Neha Singh", "hospital": "CityCare Hospital", "status": "booked"}
    ],
    "predictions": {
      "vitalsNext7Days": {"heartRate": [79,78,80,81,79,78,80], "bloodPressure": ["119/77","120/78","118/76","119/77","120/78","119/77","118/76"]},
      "appointmentProbability": [0.85,0.8,0.75,0.9,0.85,0.8,0.9],
      "medicationAdherence": [0.97,0.96,0.95,0.98,0.97,0.96,0.97]
    },
    "medicalRecords": [
        {"date": "2025-09-15", "type": "Consultation", "details": "Follow-up for Asthma. Inhaler dosage adjusted.", "doctor": "Dr. Kumar"},
        {"date": "2025-08-01", "type": "X-Ray", "details": "Chest X-ray clear.", "doctor": "Radiology Dept."}
    ]
  },
  {
    "patientId": "PAT-20251001-0003",
    "name": "Vikram Singh",
    "phone": "+919999900003",
    "dob": "1975-11-30",
    "gender": "Male",
    "medicalSummary": "Type 2 Diabetes, on Metformin",
    "emergencyContact": "+919888800003",
    "vitals": {
      "heartRate": [82, 85, 81, 83, 84, 82, 83],
      "bloodPressure": ["130/85","132/86","129/84","131/85","130/84","132/86","133/87"],
      "bloodSugar": [140, 145, 138, 150, 142, 148, 146],
      "oxygenSaturation": [99, 98, 99, 98, 99, 98, 99]
    },
    "appointments": [
      {"date": "2025-10-10", "doctor": "Dr. Priya Desai", "hospital": "Apollo Health City", "status": "booked"},
      {"date": "2025-11-01", "doctor": "Dr. Priya Desai", "hospital": "Apollo Health City", "status": "booked", "urgent": true}
    ],
    "predictions": {
      "vitalsNext7Days": {"heartRate": [83,84,82,83,85,84,83], "bloodPressure": ["131/85","130/84","132/86","133/87","131/85","130/84","132/86"]},
      "appointmentProbability": [0.7,0.65,0.75,0.8,0.7,0.75,0.8],
      "medicationAdherence": [0.92,0.9,0.94,0.91,0.93,0.92,0.9]
    },
    "medicalRecords": [
        {"date": "2025-08-10", "type": "Consultation", "details": "Diabetes management review.", "doctor": "Dr. Priya Desai"}
    ]
  },
  {
    "patientId": "PAT-20251001-0004",
    "name": "Priya Kapoor",
    "phone": "+919999900004",
    "dob": "2001-01-25",
    "gender": "Female",
    "medicalSummary": "No significant history. Generally healthy.",
    "emergencyContact": "+919888800004",
    "vitals": {
      "heartRate": [68, 70, 69, 71, 70, 69, 72],
      "bloodPressure": ["110/70","112/72","111/71","110/70","112/72","111/71","113/73"],
      "bloodSugar": [85, 88, 86, 87, 85, 89, 90],
      "oxygenSaturation": [99, 99, 98, 99, 99, 99, 99]
    },
    "appointments": [
      {"date": "2026-01-20", "doctor": "Dr. Asha Rao", "hospital": "Starlight General Hospital", "status": "booked"}
    ],
    "predictions": {
      "vitalsNext7Days": {"heartRate": [70,71,70,69,72,71,70], "bloodPressure": ["111/71","110/70","112/72","111/71","113/73","112/72","110/70"]},
      "appointmentProbability": [0.1,0.1,0.1,0.1,0.1,0.1,0.1],
      "medicationAdherence": [1,1,1,1,1,1,1]
    },
    "medicalRecords": [
         {"date": "2025-01-20", "type": "Consultation", "details": "Annual physical exam. All clear.", "doctor": "Dr. Asha Rao"}
    ]
  },
  {
    "patientId": "PAT-20251001-0005",
    "name": "Sanjay Gupta",
    "phone": "+919999900005",
    "dob": "1965-06-12",
    "gender": "Male",
    "medicalSummary": "Coronary Artery Disease, post-stent.",
    "emergencyContact": "+919888800005",
    "vitals": {
      "heartRate": [65, 66, 64, 67, 65, 66, 68],
      "bloodPressure": ["125/82","126/83","124/81","127/84","125/82","126/83","128/84"],
      "bloodSugar": [110, 112, 109, 115, 111, 114, 113],
      "oxygenSaturation": [97, 98, 97, 98, 97, 98, 97]
    },
    "appointments": [
      {"date": "2025-10-25", "doctor": "Dr. Rahul Mehra", "hospital": "Heartbeat Institute", "status": "booked", "urgent": true}
    ],
    "predictions": {
      "vitalsNext7Days": {"heartRate": [66,65,67,68,66,65,67], "bloodPressure": ["126/83","125/82","127/84","128/84","126/83","125/82","127/84"]},
      "appointmentProbability": [0.9,0.9,0.9,0.9,0.9,0.9,0.9],
      "medicationAdherence": [0.98,0.99,0.97,0.98,0.99,0.98,0.97]
    },
    "medicalRecords": [
      {"date": "2025-04-15", "type": "Procedure", "details": "Coronary angioplasty with stent placement.", "doctor": "Dr. Rahul Mehra"}
    ]
  },
  {
    "patientId": "PAT-20251001-0006",
    "name": "Meera Iyer",
    "phone": "+919999900006",
    "dob": "1998-09-05",
    "gender": "Female",
    "medicalSummary": "Migraines, occasional Iron deficiency.",
    "emergencyContact": "+919888800006",
    "vitals": {
      "heartRate": [74, 76, 75, 77, 76, 75, 78],
      "bloodPressure": ["115/75","116/76","114/74","117/77","115/75","116/76","118/78"],
      "bloodSugar": [92, 94, 93, 95, 94, 96, 97],
      "oxygenSaturation": [98, 99, 98, 99, 98, 99, 98]
    },
    "appointments": [
      {"date": "2025-10-12", "doctor": "Dr. Neha Singh", "hospital": "CityCare Hospital", "status": "booked"}
    ],
    "predictions": {
      "vitalsNext7Days": {"heartRate": [76,75,77,78,76,75,77], "bloodPressure": ["116/76","115/75","117/77","118/78","116/76","115/75","117/77"]},
      "appointmentProbability": [0.4,0.3,0.5,0.4,0.3,0.5,0.4],
      "medicationAdherence": [0.99,0.98,1,0.99,0.98,1,0.99]
    },
     "medicalRecords": [
        {"date": "2025-06-30", "type": "Consultation", "details": "Consulted for severe migraine episode.", "doctor": "Dr. Neha Singh"}
    ]
  },
  {
    "patientId": "PAT-20251001-0007",
    "name": "Arjun Reddy",
    "phone": "+919999900007",
    "dob": "1990-07-18",
    "gender": "Male",
    "medicalSummary": "ACL tear recovery (left knee).",
    "emergencyContact": "+919888800007",
    "vitals": {
      "heartRate": [70, 72, 71, 73, 72, 74, 75],
      "bloodPressure": ["122/80","123/81","121/79","124/82","122/80","123/81","125/83"],
      "bloodSugar": [98, 100, 99, 102, 101, 103, 104],
      "oxygenSaturation": [99, 98, 99, 98, 99, 98, 99]
    },
    "appointments": [
      {"date": "2025-10-20", "doctor": "Dr. Alok Gupta (Ortho)", "hospital": "Apollo Health City", "status": "booked"}
    ],
    "predictions": {
      "vitalsNext7Days": {"heartRate": [72,73,72,74,75,73,72], "bloodPressure": ["123/81","122/80","124/82","125/83","123/81","122/80","124/82"]},
      "appointmentProbability": [0.6,0.6,0.6,0.6,0.6,0.6,0.6],
      "medicationAdherence": [1,1,1,1,1,1,1]
    },
    "medicalRecords": [
      {"date": "2025-03-01", "type": "Surgery", "details": "ACL reconstruction surgery, left knee.", "doctor": "Dr. Alok Gupta (Ortho)"}
    ]
  },
  {
    "patientId": "PAT-20251001-0008",
    "name": "Sunita Rao",
    "phone": "+919999900008",
    "dob": "1958-04-22",
    "gender": "Female",
    "medicalSummary": "Osteoporosis, Hypothyroidism.",
    "emergencyContact": "+919888800008",
    "vitals": {
      "heartRate": [76, 78, 77, 79, 78, 80, 81],
      "bloodPressure": ["135/88","136/89","134/87","137/90","135/88","136/89","138/91"],
      "bloodSugar": [105, 107, 106, 108, 107, 109, 110],
      "oxygenSaturation": [96, 97, 96, 97, 96, 97, 96]
    },
    "appointments": [
      {"date": "2025-10-18", "doctor": "Dr. Priya Desai", "hospital": "Starlight General Hospital", "status": "booked"},
      {"date": "2025-12-18", "doctor": "Dr. Priya Desai", "hospital": "Starlight General Hospital", "status": "booked", "urgent": true}
    ],
    "predictions": {
      "vitalsNext7Days": {"heartRate": [78,79,78,80,81,79,78], "bloodPressure": ["136/89","135/88","137/90","138/91","136/89","135/88","137/90"]},
      "appointmentProbability": [0.8,0.8,0.8,0.8,0.8,0.8,0.8],
      "medicationAdherence": [0.95,0.96,0.94,0.95,0.96,0.94,0.95]
    },
    "medicalRecords": [
        {"date": "2025-09-01", "type": "Lab Test", "details": "TSH levels check. Dosage adjusted.", "doctor": "Dr. Priya Desai"}
    ]
  },
  {
    "patientId": "PAT-20251001-0009",
    "name": "Karan Malhotra",
    "phone": "+919999900009",
    "dob": "1982-12-01",
    "gender": "Male",
    "medicalSummary": "GERD, seasonal allergies.",
    "emergencyContact": "+919888800009",
    "vitals": {
      "heartRate": [71, 73, 72, 74, 73, 75, 74],
      "bloodPressure": ["124/81","125/82","123/80","126/83","124/81","125/82","126/83"],
      "bloodSugar": [99, 101, 100, 102, 101, 103, 102],
      "oxygenSaturation": [98, 97, 98, 97, 98, 97, 98]
    },
    "appointments": [
      {"date": "2025-10-22", "doctor": "Dr. Asha Rao", "hospital": "CityCare Hospital", "status": "booked"}
    ],
    "predictions": {
      "vitalsNext7Days": {"heartRate": [73,72,74,75,73,74,73], "bloodPressure": ["125/82","124/81","126/83","126/83","125/82","124/81","126/83"]},
      "appointmentProbability": [0.5,0.5,0.5,0.5,0.5,0.5,0.5],
      "medicationAdherence": [0.9,0.88,0.92,0.9,0.89,0.91,0.9]
    },
    "medicalRecords": [
        {"date": "2025-08-22", "type": "Consultation", "details": "Prescribed medication for GERD flare-up.", "doctor": "Dr. Asha Rao"}
    ]
  },
  {
    "patientId": "PAT-20251001-0010",
    "name": "Deepa Khanna",
    "phone": "+919999900010",
    "dob": "1995-02-14",
    "gender": "Female",
    "medicalSummary": "PCOS, under observation.",
    "emergencyContact": "+919888800010",
    "vitals": {
      "heartRate": [75, 77, 76, 78, 77, 79, 78],
      "bloodPressure": ["117/76","118/77","116/75","119/78","117/76","118/77","120/79"],
      "bloodSugar": [94, 96, 95, 97, 96, 98, 99],
      "oxygenSaturation": [99, 98, 99, 98, 99, 98, 99]
    },
    "appointments": [
      {"date": "2025-11-10", "doctor": "Dr. Neha Singh", "hospital": "Starlight General Hospital", "status": "booked"}
    ],
    "predictions": {
      "vitalsNext7Days": {"heartRate": [77,76,78,79,77,78,77], "bloodPressure": ["118/77","117/76","119/78","120/79","118/77","117/76","119/78"]},
      "appointmentProbability": [0.65,0.7,0.6,0.75,0.65,0.7,0.6],
      "medicationAdherence": [0.99,0.99,1,0.98,0.99,1,0.99]
    },
    "medicalRecords": [
        {"date": "2025-09-10", "type": "Ultrasound", "details": "Pelvic ultrasound for PCOS monitoring. Results stable.", "doctor": "Dr. Neha Singh"}
    ]
  }
];

export type Patient = typeof dummyPatients[0];
