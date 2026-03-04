import { FaClock, FaUser } from "react-icons/fa";
import { useQueryClient } from "@tanstack/react-query";
import { fetchGithubUser } from "../api/github";

type RecentSearchProps = {
  users: string[];
  onSelect: (username: string) => void;
};

const RecentSearch = ({ users, onSelect }: RecentSearchProps) => {
  const queryClient = useQueryClient();

  return (
    <div className="recent-searches">
      <div className="recent-header">
        <FaClock />
        <h2>Recent Searches</h2>
      </div>
      <ul>
        {users.map((user) => (
          <li key={user}>
            <button
              onClick={() => onSelect(user)}
              onMouseEnter={() => {
                queryClient.prefetchQuery({
                  queryKey: ["users", user],
                  queryFn: () => fetchGithubUser(user),
                });
              }}
            >
              <FaUser className="user-icon" />
              {user}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentSearch;
