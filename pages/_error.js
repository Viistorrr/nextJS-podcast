import React from "react";
import Layout from "../components/Layout";
import Link from "next/link";

function Error({ statusCode }) {
  return (
    <Layout title="Ohhhhh :(">
      {statusCode === 404 ? (
        <div className="message">
          <h1>Esta Página no está disponible :(</h1>
          <p>
            <Link href="/">
              <a>Volver al inicio</a>
            </Link>
          </p>
        </div>
      ) : (
        <div className="message">
          <h1>Hemos tenido un problema :(</h1>
          <p>Intenta nuevaente...</p>
        </div>
      )}
      <style jsx>{`
        .message {
          padding: 100px 30px;
          text-align: center];
        }
        h1 {
          margin-bottom: 2em;
        }
        a {
          color: #8756ca;
        }
      `}</style>
    </Layout>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
