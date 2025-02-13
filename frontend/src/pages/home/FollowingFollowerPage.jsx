import { Link } from "react-router-dom";
import { useState } from "react";

const FollowingFollowerPage = () => {
  const [feedType, setFeedType] = useState("following");
  return (


    

    <div className="flex-[4_4_0] border-gray-700 border-r min-h-screen text-white">
      {/* Header */}
      <div className="top-0 sticky flex items-center gap-3 bg-black p-4 border-gray-700 border-b">
        <Link to="/" className="font-bold text-xl">
          👈
        </Link>
        <div>
          <h1 className="font-bold text-xl">Karishma</h1>
          <p className="text-gray-400 text-sm">@Karishma</p>
        </div>
      </div>
      <div className="flex border-gray-700 border-b w-full">
        <div
          className="relative flex flex-1 justify-center hover:bg-secondary p-3 transition duration-300 cursor-pointer"
          onClick={() => setFeedType("Follower")}
        >
          Follower
          {feedType === "Follower" && (
            <div className="bottom-0 absolute bg-primary rounded-full w-20 h-1"></div>
          )}
        </div>
        <div
          className="relative flex flex-1 justify-center hover:bg-secondary p-3 transition duration-300 cursor-pointer"
          onClick={() => setFeedType("Following")}
        >
          Following
          {feedType === "Following" && (
            <div className="bottom-0 absolute bg-primary rounded-full w-20 h-1"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FollowingFollowerPage;
