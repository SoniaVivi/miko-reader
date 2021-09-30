import { useGetUserQuery, useGetGroupsQuery } from "../apiSlice";

const useGetUserAndGroupQuery = ({ user, group, groups = null }) => {
  const { name: userName } = useGetUserQuery(user, {
    selectFromResult: ({ data }) => ({
      name: data?.data.attributes.username,
    }),
    skip: !user,
  });
  const { name: groupName } = useGetGroupsQuery(groups ?? [group], {
    selectFromResult: ({ data }) => ({
      name: data?.entities[group]?.attributes?.name,
    }),
    skip: !group && !groups,
  });
  return { user: userName, group: groupName };
};

export default useGetUserAndGroupQuery;
