import React, { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [lastId, setLastId] = useState(0);
  const [tempId, setTempId] = useState(0);
  const [limit, setLimit] = useState(20);
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    getUsers();
  }, [lastId, keyword]);
  const getUsers = async () => {
    const params = new URLSearchParams({
      search_query: keyword,
      last_id: String(lastId),
      limit: String(limit),
    });
    const response = await axios.get(
      `http://localhost:5000/users?${params.toString()}`,
    );
    console.log(response.data);
    const newUsers = response.data.result;
    setUsers([...users, ...newUsers]);
    setTempId(response.data.lastId);
    setHasMore(response.data.hasMore);
  };
  const fetchMore = () => {
    setLastId(tempId);
  };
  const searchData = (e) => {
    e.preventDefault();
    setLastId(0);
    setUsers([]);
    setKeyword(query);
  };
  return (
    <div className="container mt-5">
      <div className="columns">
        <div className="column is-centered">
          <form onSubmit={searchData}>
            <div className="field has-addons">
              <div className="control is-expanded">
                <input
                  type="text"
                  className="input"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Trouvez quelque chose ici..."
                />
              </div>
              <div className="control">
                <button type="submit" className="button is-info">
                  search
                </button>
              </div>
            </div>
          </form>
          <InfiniteScroll
            dataLength={users.length}
            next={fetchMore}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
          >
            <table className="table is-striped is-bordered is-fullwidth mt-2">
              <thead>
                <tr>
                  <th>No</th>
                  <th>ID</th>
                  <th>nom</th>
                  <th>prenom</th>
                  <th>email</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.id}</td>
                    <td>{user.nom}</td>
                    <td>{user.prenom}</td>
                    <td>{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};
export default UserList;
