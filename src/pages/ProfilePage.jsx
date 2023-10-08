import { useParams } from "react-router-dom";
import ProfileCover from "../features/profile/ProfileCover";
import ProfileInfo from "../features/profile/ProfileInfo";
import { useState, useEffect } from "react";
import axios from "../config/axios";
import { useAuth } from "../hooks/use-auth";

export default function ProfilePage() {
  const [profileUser, setProfileUser] = useState({});
  const [statusWithAuthUser, setStatusWithAuthUser] = useState("");

  const { profileId } = useParams();

  const { authUser } = useAuth();
  const isAuthUser = authUser.id === +profileId;

  useEffect(() => {
    axios
      .get(`/user/${profileId}`)
      .then((res) => {
        console.log("authUser =", authUser);
        console.log("res =", res);
        setProfileUser(res.data.user);

        let mappingProfileStatus = "";
        if (res.data.user?.id === authUser?.id) {
          mappingProfileStatus = "AUTH_USER";
        } else if (res.data.user?.id !== authUser?.id) {
          mappingProfileStatus = "UNKNOW";
        }
        setStatusWithAuthUser(mappingProfileStatus);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [profileId]);

  return (
    <div className="bg-gradient-to-b from-gray-200 to-white shadow pb-4">
      {profileUser ? (
        <>
          <ProfileCover
            coverImage={
              isAuthUser ? authUser.coverImage : profileUser?.coverImage
            }
          />
          <ProfileInfo
            profileUser={profileUser}
            statusWithAuthUser={statusWithAuthUser}
            setStatusWithAuthUser={setStatusWithAuthUser}
          />
        </>
      ) : (
        <h1 className="text-center p-8 text-3xl font-bold">
          404 !!! user not found
        </h1>
      )}
    </div>
  );
}
