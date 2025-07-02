import { FaEye, FaCheck, FaTrash } from "react-icons/fa";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const PendingRiders = () => {
    const qc = useQueryClient();

    // Fetch pending riders
    const { data: riders = [], isLoading } = useQuery({
        queryKey: ['riders', 'pending'],
        queryFn: () =>
            axios.get(`${API}/riders?status=pending`).then(res => res.data),
    });


    // Accept (activate) rider mutation
    const acceptMutation = useMutation({
        mutationFn: ({ id }) =>
            axios.patch(`${API}/riders/${id}?action=accept`),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['riders'] }),
    });


    // Delete rider mutation
    const deleteMutation = useMutation({
        mutationFn: (id) => axios.delete(`${API}/riders/${id}`),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['riders'] }),
    });
    // Handle loading and error states
    const isError = riders instanceof Error;

    if (isLoading) return <p className="text-center py-10">⏳ Loading pending riders...</p>;
    if (isError) return <p className="text-center text-red-500">❌ Error: {riders.message}</p>;

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">⏳ Pending Riders ({riders.length})</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Details</th>
                            <th>Accept</th>
                            <th>Delete</th>
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
                                        onClick={() => alert(JSON.stringify(rider, null, 2))}
                                        title="View details"
                                    />
                                </td>
                                <td>
                                    <FaCheck
                                        className="cursor-pointer text-green-600"
                                        onClick={() => acceptMutation.mutate({ id: rider._id })}
                                        title="Accept rider"
                                    />
                                </td>
                                <td>
                                    <FaTrash
                                        className="cursor-pointer text-red-600"
                                        onClick={() => deleteMutation.mutate(rider._id)}
                                        title="Delete rider"
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

export default PendingRiders;