import { useParams } from "react-router-dom";
import ActionButton from "./ActionButton";
import axios from "axios";

export default function UnknownAction({ setStatusWithAuthUser }) {
  const { profileId } = useParams();

  const handleClickAddFriend = async () => {
    try {
      await axios.post(`/friend/${profileId}`);
      setStatusWithAuthUser("REQUESTER");
    } catch (err) {
      console.log(err);
    }
  };

  return <ActionButton onclick={handleClickAddFriend}>Add friend</ActionButton>;
}
