import axios from "axios";
import { useNavigate } from "react-router-dom";

// DataTable Columns
export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    sortable: true,
    width: "100px",
  },
  {
    name: "Name", 
    selector: (row) => row.name,
    sortable: true,
    width: "150px",
  },
  {
    name: "Image",
    cell: (row) => (
      <div className="flex justify-center items-center">
        <img
          src={row.profileImage}
          alt="Profile"
          className="h-12 w-12 rounded-full object-cover border border-gray-300 shadow-sm"
        />
      </div>
    ),
    width: "120px",
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    sortable: true,
    width: "120px",
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    sortable: true,
    width: "130px",
  },
  {
    name: "Action",
cell: (row) => <EmployeeButtons id={row._id}  />,

    center: true, // ✅ make sure it's boolean not string
  },
];

// Action Buttons Component
export const EmployeeButtons = ({ id }) => {
  const navigate = useNavigate();

  const buttonClass =
    "px-3 py-1 text-sm font-semibold rounded-full shadow hover:scale-105 transform transition-all duration-200";

  return (
    <div className="flex flex-wrap justify-start items-center gap-2">
      <button
        className={`${buttonClass} bg-blue-500 hover:bg-blue-600 text-white`}
        onClick={() => navigate(`/admin-dashboard/view-employee/${id}`)}
      >
        👁️ View
      </button>
      <button
        className={`${buttonClass} bg-green-500 hover:bg-green-600 text-white`}
        onClick={() => navigate(`/admin-dashboard/edit-employee/${id}`)}
      >
        ✏️ Edit
      </button>
      <button
        className={`${buttonClass} bg-yellow-500 hover:bg-yellow-600 text-white`}
        onClick={() => navigate(`/admin-dashboard/salary-employee/${id}`)}
      >
        💰 Salary
      </button>
      <button
        className={`${buttonClass} bg-red-500 hover:bg-red-600 text-white`}
        onClick={() => navigate(`/admin-dashboard/leave-employee/${id}`)}
      >
        🌴 Leave
      </button>
    </div>
  );
};

// Fetch Department API (Optional utility)
export const fetchDepartments = async () => {
  try {
    const response = await axios.get("https://empbackend-steel.vercel.app/api/department", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data.success ? response.data.departments : [];
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
    return [];
  }
};


export const getEmployees = async (deptId) => {
  try {
    const response = await axios.get(
      `https://empbackend-steel.vercel.app/api/employee/department/${deptId}`, // Updated endpoint
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    );
    
    // Debug log
    console.log("API Response:", response.data);
    
    // Handle both possible response structures
    return response.data.employees || response.data.data || [];
    
  } catch (error) {
    console.error("Error fetching employees:", error);
    alert(error.response?.data?.message || "Failed to load employees");
    return [];
  }
};