import { FaEye, FaToggleOn } from "react-icons/fa";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const ActiveRiders = () => {
    const queryClient = useQueryClient();

    // ✅ Fetch active riders (correct v5 object form)
    const {
        data: riders = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['riders', 'active'],
        queryFn: () =>
            axios.get(`${API}/riders?status=active`).then((res) => res.data),
    });

    // ✅ Mutation to toggle rider to "pending"
    const toggleMutation = useMutation({
        mutationFn: ({ id }) =>
            axios.patch(`${API}/riders/${id}?action=toggle`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['riders'] });
        },
    });

    // 🔄 Handler for deactivating
    const handleToggle = (id) => {
        toggleMutation.mutate({ id });
    };

    if (isLoading) return <p>⏳ Loading...</p>;
    if (isError) return <p className="text-red-500">❌ Error: {error.message}</p>;

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">✅ Active Riders ({riders.length})</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Details</th>
                            <th>Deactivate</th>
                            <th>Full Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Vehicle</th>
                            <th>Region</th>
                            <th>Warehouse</th>
                            <th>Applied At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {riders.map((rider, idx) => (
                            <tr key={rider._id}>
                                <td>{idx + 1}</td>
                                <td>
                                    <FaEye
                                        className="cursor-pointer text-blue-500"
                                        onClick={() =>
                                            alert(JSON.stringify(rider, null, 2))
                                        }
                                        title="View Rider"
                                    />
                                </td>
                                <td>
                                    <FaToggleOn
                                        className="cursor-pointer text-orange-500"
                                        onClick={() => handleToggle(rider._id)}
                                        title="Deactivate Rider"
                                    />
                                </td>
                                <td>{rider.fullName}</td>
                                <td>{rider.phone}</td>
                                <td>{rider.email}</td>
                                <td>{rider.vehicleType}</td>
                                <td>{rider.region}</td>
                                <td>{rider.warehouse}</td>
                                <td>{new Date(rider.appliedAt).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ActiveRiders;