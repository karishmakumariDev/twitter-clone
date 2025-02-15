// import { Link, useParams, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { useQuery, useQueryClient } from "@tanstack/react-query";

// const fetchFollowing = async (userId) => {
//   const res = await fetch(`/api/users/following/${userId}`);
//   if (!res.ok) throw new Error("Failed to fetch following users");
//   return res.json();
// };

// const fetchFollowers = async (userId) => {
//   const res = await fetch(`/api/users/follower/${userId}`);
//   if (!res.ok) throw new Error("Failed to fetch followers");
//   return res.json();
// };

// const FollowingFollowerPage = () => {
//   const [feedType, setFeedType] = useState("following");
//   const [isFollowing, setIsFollowing] = useState(true);
//   const [hover, setHover] = useState(false);

//   const { username, followingFollwerState } = useParams();
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();

//   // Get logged-in user data
//   const userData = queryClient.getQueryData(["authUser"]);
//   console.log("userData", userData);
//   const userId = userData?._id;
//   console.log("userId", userId);

//   // Set feedType from URL params
//   useEffect(() => {
//     if (followingFollwerState) {
//       setFeedType(followingFollwerState);
//     }
//   }, [followingFollwerState]);

//   // Fetch following & followers using React Query
//   const { data: followingData, isLoading: followingLoading } = useQuery({
//     queryKey: ["following", userId],
//     queryFn: () => fetchFollowing(userId),
//     enabled: feedType === "following" && !!userId,
//   });

//   const { data: followersData, isLoading: followersLoading } = useQuery({
//     queryKey: ["followers", userId],
//     queryFn: () => fetchFollowers(userId),
//     enabled: feedType === "followers" && !!userId,
//   });

//   return (
//     <div className="flex-[4_4_0] border-gray-700 border-r min-h-screen text-white">
//       {/* Header */}
//       <div className="top-0 sticky flex items-center gap-3 bg-black p-4 border-gray-700 border-b">
//         <Link to="/" className="font-bold text-xl">
//           👈
//         </Link>
//         <div>
//           <h1 className="font-bold text-xl">{userData.fullName}</h1>
//           <p className="text-gray-400 text-sm">{userData.username}</p>
//         </div>
//       </div>

//       {/* Toggle Buttons */}
//       <div className="flex border-gray-700 border-b w-full">
//         <div
//           className={`relative flex flex-1 justify-center hover:bg-secondary p-3 transition duration-300 cursor-pointer ${
//             feedType === "followers" ? "text-blue-500 font-bold" : ""
//           }`}
//           onClick={() => {
//             setFeedType("followers");
//             navigate(`/profile/${username}/followers`);
//           }}
//         >
//           Followers
//           {feedType === "followers" && (
//             <div className="bottom-0 absolute bg-primary rounded-full w-20 h-1"></div>
//           )}
//         </div>
//         <div
//           className={`relative flex flex-1 justify-center hover:bg-secondary p-3 transition duration-300 cursor-pointer ${
//             feedType === "following" ? "text-blue-500 font-bold" : ""
//           }`}
//           onClick={() => {
//             setFeedType("following");
//             navigate(`/profile/${username}/following`);
//           }}
//         >
//           Following
//           {feedType === "following" && (
//             <div className="bottom-0 absolute bg-primary rounded-full w-20 h-1"></div>
//           )}
//         </div>
//       </div>

//       {/* List Section */}
//       <div className="p-4">
//         {feedType === "following" ? (
//           followingLoading ? (
//             <p className="text-gray-400">Loading following users...</p>
//           ) : followingData?.length > 0 ? (
//             <ul>
//               {followingData.map((user) => (
//                 <li
//                   key={user._id}
//                   className="flex items-center gap-4 p-3 border-gray-700 border-b"
//                 >
//                   <img
//                     src={user.profileImage}
//                     alt={user.username}
//                     className="rounded-full w-10 h-10"
//                   />
//                   <div>
//                     <h2 className="font-bold">{user.fullName}</h2>
//                     <p className="text-gray-400">@{user.username}</p>
//                   </div>
//                   <Link
//                     className="ml-auto text-blue-500"
//                     onClick={() => setIsFollowing((prev) => !prev)}
//                     onMouseEnter={() => setHover(true)}
//                     onMouseLeave={() => setHover(false)}
//                   >
//                     <span>
//                       {isFollowing
//                         ? hover
//                           ? "Unfollow"
//                           : "Following"
//                         : "Follow"}
//                     </span>
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-gray-400">No following users found.</p>
//           )
//         ) : followersLoading ? (
//           <p className="text-gray-400">Loading followers...</p>
//         ) : followersData?.length > 0 ? (
//           <ul>
//             {followersData.map((user) => (
//               <li
//                 key={user._id}
//                 className="flex items-center gap-4 p-3 border-gray-700 border-b"
//               >
//                 <img
//                   src={user.profileImage}
//                   alt={user.username}
//                   className="rounded-full w-10 h-10"
//                 />
//                 <div>
//                   <h2 className="font-bold">{user.fullName}</h2>
//                   <p className="text-gray-400">@{user.username}</p>
//                 </div>
//                 <Link className="ml-auto text-blue-500">Follow</Link>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-gray-400">No followers found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FollowingFollowerPage;


import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const fetchFollowing = async (userId) => {
  const res = await fetch(`/api/users/following/${userId}`);
  if (!res.ok) throw new Error("Failed to fetch following users");
  return res.json();
};

const fetchFollowers = async (userId) => {
  const res = await fetch(`/api/users/follower/${userId}`);
  if (!res.ok) throw new Error("Failed to fetch followers");
  return res.json();
};

const FollowingFollowerPage = () => {
  const [feedType, setFeedType] = useState("following");
  const [hoveredUserId, setHoveredUserId] = useState(null); // Track kis user pe hover ho raha hai

  const { username, followingFollwerState } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const userData = queryClient.getQueryData(["authUser"]);
  console.log("userData",userData);
  const userId = userData?._id;
  console.log("userId",userId)

  useEffect(() => {
    if (followingFollwerState) {
      setFeedType(followingFollwerState);
    }
  }, [followingFollwerState]);

  const { data: followingData, isLoading: followingLoading } = useQuery({
    queryKey: ["following", userId],
    queryFn: () => fetchFollowing(userId),
    enabled: feedType === "following" && !!userId,
  });

  const { data: followersData, isLoading: followersLoading } = useQuery({
    queryKey: ["followers", userId],
    queryFn: () => fetchFollowers(userId),
    enabled: feedType === "followers" && !!userId,
  });

  return (
    <div className="flex-[4_4_0] border-gray-700 border-r min-h-screen text-white">
      {/* Header */}
      <div className="top-0 sticky flex items-center gap-3 bg-black p-4 border-gray-700 border-b">
        <Link to="/" className="font-bold text-xl">👈</Link>
        <div>
          <h1 className="font-bold text-xl">{userData?.fullName}</h1>
          <p className="text-gray-400 text-sm">@{userData?.username}</p>
        </div>
      </div>

      {/* Toggle Buttons */}
      <div className="flex border-gray-700 border-b w-full">
        <div
          className={`relative flex flex-1 justify-center hover:bg-secondary p-3 transition duration-300 cursor-pointer ${
            feedType === "followers" ? "text-blue-500 font-bold" : ""
          }`}
          onClick={() => {
            setFeedType("followers");
            navigate(`/profile/${username}/followers`);
          }}
        >
          Followers
          {feedType === "followers" && <div className="bottom-0 absolute bg-primary rounded-full w-20 h-1"></div>}
        </div>
        <div
          className={`relative flex flex-1 justify-center hover:bg-secondary p-3 transition duration-300 cursor-pointer ${
            feedType === "following" ? "text-blue-500 font-bold" : ""
          }`}
          onClick={() => {
            setFeedType("following");
            navigate(`/profile/${username}/following`);
          }}
        >
          Following
          {feedType === "following" && <div className="bottom-0 absolute bg-primary rounded-full w-20 h-1"></div>}
        </div>
      </div>

      {/* List Section */}
      <div className="p-4">
        {feedType === "following" ? (
          followingLoading ? (
            <p className="text-gray-400">Loading following users...</p>
          ) : followingData?.length > 0 ? (
            <ul>
              {followingData.map((user) => (
                <li
                  key={user._id}
                  className="flex items-center gap-4 p-3 border-gray-700 border-b"
                >
                  <img
                    src={user.profileImage}
                    alt={user.username}
                    className="rounded-full w-10 h-10"
                  />
                  <div>
                    <h2 className="font-bold">{user.fullName}</h2>
                    <p className="text-gray-400">@{user.username}</p>
                  </div>
                  <Link
                    className="ml-auto text-blue-500"
                    onMouseEnter={() => setHoveredUserId(user._id)}
                    onMouseLeave={() => setHoveredUserId(null)}
                  >
                    <span>
                      {hoveredUserId === user._id ? "Unfollow" : "Following"}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No following users found.</p>
          )
        ) : followersLoading ? (
          <p className="text-gray-400">Loading followers...</p>
        ) : followersData?.length > 0 ? (
          <ul>
            {followersData.map((user) => (
              <li
                key={user._id}
                className="flex items-center gap-4 p-3 border-gray-700 border-b"
              >
                <img
                  src={user.profileImage}
                  alt={user.username}
                  className="rounded-full w-10 h-10"
                />
                <div>
                  <h2 className="font-bold">{user.fullName}</h2>
                  <p className="text-gray-400">@{user.username}</p>
                </div>
                <Link className="ml-auto text-blue-500">Follow</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No followers found.</p>
        )}
      </div>
    </div>
  );
};

export default FollowingFollowerPage;
