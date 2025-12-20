import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminDashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const isAdmin = localStorage.getItem("isAdmin");

        if (!token || isAdmin !== "true") {
            navigate("/admin");
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("isAdmin");
        navigate("/admin");
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="mb-8 flex items-center justify-between">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <Button onClick={handleLogout} variant="destructive">
                    Logout
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Welcome Service</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Welcome to the Yeoubi Frosted Lux Admin Panel.</p>
                    </CardContent>
                </Card>
                {/* Add more dashboard widgets here */}
            </div>
        </div>
    );
};

export default AdminDashboard;
