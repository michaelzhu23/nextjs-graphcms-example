import { GraphQLClient, gql } from "graphql-request";
import useSWR from "swr";
import Avatar from "components/avatar";

const AUTHORS_QUERY = gql`
  {
    authors {
      id
      name
      picture {
        url(
          transformation: {
            image: { resize: { fit: crop, height: 100, width: 100 } }
          }
        )
      }
    }
  }
`;

async function customFetcher() {
  const API =
    "https://api-us-east-1.graphcms.com/v2/ckby1wqg60ihq01xxffqc77x1/master";

  const graphQLClient = new GraphQLClient(API, {
    headers: {
      authorization:
        "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE1OTMyODQ0MDIsImF1ZCI6WyJodHRwczovL2FwaS11cy1lYXN0LTEuZ3JhcGhjbXMuY29tL3YyL2NrYnkxd3FnNjBpaHEwMXh4ZmZxYzc3eDEvbWFzdGVyIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiNjg1MTI5NWMtZmZlOC00NGZiLTlkZmYtOTY0NTJiZmEwYmMwIiwianRpIjoiY2thNWo0djJmMDN3bTAxejNhMmN2ZXo0ZCJ9.RdBTnBf4QDt5uJLYUMVNq8JtqXOe8g0tGHGioOr9jaGUZrp0Puq68q2IOy5irXEf06uNPShVLO-LOZEWCWQ8za0qUeObrOtNDE5mWCbMsZKBnCzQbZjZJw8NQ-fZkBUtu4s_CSfpFipzSf5i5M2iR2PE1xd1msKYYBRAr4h6HKVw0zGNe3cljLAZkuhUD2hpyVpYNG4--L2zISiSxnr09SzmbftIZMZv4-cvdcoWk182IbJON1As-lC--apTyWZqZ7Sy0sSOhEBou1MNbDTr_fYATTEgg-v7sN_y3SfnegfYkvIMe9wtLZ8v5FuZggGTXJ5yimVBGltof9S-rXsioz91uEDAswFDuum7n3UVtZX2virYLGLRfcy3EJnPq_8VXlNb1D9P8x_9slik5S-oUVSK8z_j3-zsor62gjlNKa8o3LyWtQnXSsMEArWvl4szBSSYb0nm3kEl9rah3VbGv7Pjep0ZsiBroLe2YdjOnK681-frVIUfvxfpYMCFrpxiG_fI_9HKmAOIeZLWY-txO77PrLN0fi_gz60LxuLn5pa2ZzuW0gAlSHcmroVNRkdSDJBgxB5viytP_YjAsX9LMYBT9bXLSBA5qtokjCBbKg6lShwGYJpBB-6cm-tik0jKQh_T7nlohCnKG6gJe3l6YTCqGQB43vzd2lLzK-IyH6Q",
    },
  });

  const data = await graphQLClient.request(AUTHORS_QUERY);
  return data;
}

customFetcher().catch((error) => console.error(error));

const Authors = () => {
  const { data, error } = useSWR(AUTHORS_QUERY, customFetcher);
  const loading = !data;
  console.log("author data", data);
  console.log("loading", loading);

  const authors = loading ? (
    <h1>Fetching data...</h1>
  ) : (
    <div>
      {data.authors.map((author) => (
        <Avatar
          key={author.id}
          name={author.name}
          picture={author.picture.url}
        />
      ))}
    </div>
  );

  return <div>{authors}</div>;
};

export default Authors;
