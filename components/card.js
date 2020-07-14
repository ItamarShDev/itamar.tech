import { ThemeContext } from "@hooks";
import { useContext } from "react";
import Link from "next/link";

export default function Card({ children, title, subTitle, route }) {
  const { theme } = useContext(ThemeContext);
  return (
    <Link href={route}>
      <a className="card">
        <h3>{title}</h3>
        <p>{subTitle}</p>
        {children}
        <style jsx>{`
          .card:hover {
            color: ${theme.decorations};
            border-color: ${theme.decorations};
            margin: 1rem;
          }
        `}</style>
        <style jsx>{`
          .card {
            margin: 1rem;
            flex-basis: 45%;
            padding: 1.5rem;
            text-align: left;
            color: ${theme.text};
            text-decoration: none;
            border: 1px solid;
            border-color: ${theme.decoration};
            border-radius: 10px;
            transition: color 0.15s ease, border-color 0.15s ease;
          }

          .card h3 {
            margin: 0 0 1rem 0;
            font-size: 1.5rem;
          }

          .card p {
            margin: 0;
            font-size: 1.25rem;
            line-height: 1.5;
          }
        `}</style>
      </a>
    </Link>
  );
}