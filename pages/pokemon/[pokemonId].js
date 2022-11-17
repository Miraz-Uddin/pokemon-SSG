/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Link from "next/link";
import React from "react";
import styles from "../../styles/Details.module.css";

export async function getStaticPaths() {
  const res = await fetch(
    "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
  );
  const pokemons = await res.json();

  return {
    paths: pokemons.map((pokemon) => ({
      params: { pokemonId: pokemon.id.toString() },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${params.pokemonId}.json`
  );

  return {
    props: {
      pokemon: await res.json(),
    },
  };
}

export default function SinglePokemon({ pokemon }) {
  return (
    <div>
      <Head>
        <title>{pokemon?.name}</title>
      </Head>
      <div>
        <Link href="/">Back to Home</Link>
      </div>
      <div className={styles.layout}>
        <div>
          <img
            className={styles.picture}
            src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon?.image}`}
            alt={pokemon?.name?.english}
          />
        </div>
        <div>
          <div className={styles.name}>{pokemon?.name}</div>
          <div className={styles.type}>{pokemon?.type.join(", ")}</div>
          <table>
            <thead className={styles.header}>
              <tr>
                <th>Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {pokemon?.stats?.map(({ name, value }) => (
                <tr key={name}>
                  <td className={styles.attribute}>{name}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
