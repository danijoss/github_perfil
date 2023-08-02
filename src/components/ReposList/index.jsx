import { useEffect, useState } from "react";

import styles from './ReposList.module.css';

const ReposList = ({ nomeUsuario }) => {
    const [repos, setRepos] = useState([]);
    const [estaCarregando, setEstaCarregando] = useState(true);
    const [deuErro, setDeuErro] = useState(false);

    useEffect(() => {
        setEstaCarregando(true);
        fetch(`https://api.github.com/users/${nomeUsuario}/repos`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Erro ao buscar o usuário, verifique o username.');
                }
                return res.json();
            })
            .then((resJson) => {
                    setTimeout(() => {
                        setEstaCarregando(false);
                        setDeuErro(false)
                        setRepos(resJson);
                    }, 1000);
                })
            .catch((error) => {
                setEstaCarregando(false);
                setDeuErro(true);
                alert(error.message);
            })
                // .then(res => res.json())
                // .then(resJson => {
                //     setTimeout(() => {
                //         setEstaCarregando(false);
                //         setRepos(resJson);
                //     }, 1000);
                // })
                // .catch(e => {
                //     setDeuErro(true)
                //     alert("Ocorreu um erro ao buscar o usuário, verifique o username.")
                // })

            }, [nomeUsuario]);

        return (
            <div className="container">
                {deuErro ? (
                    <h1>Erro ao buscar o usuário, verifique o username</h1>
                ) :
                    estaCarregando ? (
                        <h1>Carregando...</h1>
                    ) : (
                        <ul className={styles.list}>
                            {/* {repos.map(repositorio => ( */}
                            {repos.map(({ id, name, language, html_url }) => (
                                <li className={styles.listItem} key={id}>
                                    <div className={styles.itemName}>
                                        <b>Nome: </b>
                                        {name}
                                    </div>
                                    <div className={styles.itemLanguage}>
                                        <b>Linguagem: </b>
                                        {language}
                                    </div>
                                    <a className={styles.itemLink} target="_blank" href={html_url}>Visitar no GitHub</a>
                                </li>
                            ))}
                        </ul>
                    )}
            </div>
        )
    }

export default ReposList;