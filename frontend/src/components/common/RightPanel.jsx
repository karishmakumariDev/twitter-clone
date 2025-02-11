import { Link } from "react-router-dom";
import RightPanelSkeleton from "../skeletons/RightPanelSkeleton";
//import { USERS_FOR_RIGHT_PANEL } from "../../utils/db/dummy";
import { useQuery } from "@tanstack/react-query";

//import LoadingSpinner from "./LoadingSpinner";

const RightPanel = () => {
  const { data: suggestedUsers, isLoading } = useQuery({
    queryKey: ["suggestedUsers"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/users/suggested");
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Something went wrong!");
        }
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  });

  if (suggestedUsers?.length === 0) return <div className="w-0 md:w-64"></div>;

 // const { follow, isPending } = useFollow();

  return (
    <div className="hidden lg:block mx-2 my-4">
      <div className="top-2 sticky bg-[#16181C] p-4 rounded-md">
        <p className="font-bold">Who to follow</p>
        <div className="flex flex-col gap-4">
          {/* item */}
          {isLoading && (
            <>
              <RightPanelSkeleton />
              <RightPanelSkeleton />
              <RightPanelSkeleton />
              <RightPanelSkeleton />
            </>
          )}
          {!isLoading &&
            suggestedUsers?.map((user) => (
              <Link
                to={`/profile/${user.username}`}
                className="flex justify-between items-center gap-4"
                key={user._id}
              >
                <div className="flex items-center gap-2">
                  <div className="avatar">
                    <div className="rounded-full w-8">
                      <img src={user.profileImg || "/avatar-placeholder.png"} />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="w-28 font-semibold truncate tracking-tight">
                      {user.fullName}
                    </span>
                    <span className="text-slate-500 text-sm">
                      @{user.username}
                    </span>
                  </div>
                </div>
                <div>
                  <button
                    className="bg-white hover:bg-white hover:opacity-90 rounded-full text-black btn btn-sm"
                    onClick={(e) => {
                      e.preventDefault(); // Now inside a block
                      //follow(user?._id); // Using optional chaining to prevent errors
                    }}
                  >
                    follow
                    {/* {isPending ? < LoadingSpinner size="sm"/> : "follow"} */}
                  </button>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};
export default RightPanel;
