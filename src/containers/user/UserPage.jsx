import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadProperty from "../property/UploadProperty.jsx";

const UserPage = () => {
    let navigate = useNavigate();
    const { userId } = useParams();
    const user = useSelector((state) => state.user);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user.id !== null && user.id !== userId) {
            navigate(`/user/${user.id}`);
        }

        if (user.id === null) {
            navigate(`/login`);
        }

        document.title = `${user.firstName} ${user.lastName} - Livin it`;
        setLoading(false);
    }, [user.id, navigate, userId, user.firstName, user.lastName]);

    const isPropertyOwner = user.accountType === "Property Owner";

    return (
        <div>
            {loading && <p>Loading...</p>}
            {!loading &&
                <div className="flex justify-center">
                    <div className="flex justify-center">
                        {isPropertyOwner && (
                            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded self-center mr-0" onClick={() => navigate(`./UploadProperty`)}>
                                Add Property
                            </button>
                        )}
                    </div>
                </div>
            }
        </div>
    );
};

export default UserPage;
