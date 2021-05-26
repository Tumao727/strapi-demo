module.exports = () => {
  const url =
    process.env.CUSTOMCONNSTR_pg ||
    "postgresql://postgres:docker@127.0.0.1:5432/milvus-strapi";

  const getDetailFromUrl = (url) => {
    if (!url) return {};
    url = url.replace("postgresql://", "");
    const [username, pwdHost, portDatabase] = url.split(":");
    const [password, host] = pwdHost.split("@");
    const [port, database] = portDatabase.split("/");

    return {
      username,
      password,
      host,
      port,
      database,
    };
  };

  const {
    username = "",
    password = "",
    host = "",
    port = "",
    database = "",
  } = getDetailFromUrl(url);

  return {
    defaultConnection: "default",
    connections: {
      default: {
        connector: "bookshelf",
        settings: {
          client: "postgres",
          host: host || "127.0.0.1",
          port: port || 5432,
          database: database || "strapi",
          username: username || "postgres",
          password: password || "postgres",
          ssl: process.env.NODE_ENV === "production",
        },
        options: {
          useNullAsDefault: true,
        },
      },
    },
  };
};
