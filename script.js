document.addEventListener('DOMContentLoaded', () => {
    const complaintForm = document.getElementById('complaintForm');
    const complaintsList = document.getElementById('complaints');

    complaintForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const department = document.getElementById('department').value;
        const complaint = document.getElementById('complaint').value;

        const response = await fetch('/api/complaints', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, department, complaint }),
        });

        if (response.ok) {
            alert('Complaint submitted successfully!');
            complaintForm.reset();
            fetchComplaints();
        } else {
            alert('Error submitting complaint. Please try again.');
        }
    });

    async function fetchComplaints() {
        const response = await fetch('/api/complaints');
        const complaints = await response.json();

        complaintsList.innerHTML = '';
        complaints.forEach(complaint => {
            const li = document.createElement('li');
            li.textContent = `${complaint.name} (${complaint.department}): ${complaint.complaint}`;
            complaintsList.appendChild(li);
        });
    }

    fetchComplaints();
});

