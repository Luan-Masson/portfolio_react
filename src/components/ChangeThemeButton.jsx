import { PrimeReactContext } from "primereact/api";
import { Button } from "primereact/button";
import { useContext, useEffect, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

export default function ChangeThemeButton() {
    const { data } = useLanguage();    
    const temaEscuro = window.matchMedia('(prefers-color-scheme: dark)').matches
    const { changeTheme } = useContext(PrimeReactContext);
    const [currentTheme, setTheme] = useState(() => {
        const savedTheme = sessionStorage.getItem("theme");
        return savedTheme ? savedTheme : (temaEscuro ? "viva-dark" : "viva-light");
    });
    
    useEffect(() => {
        sessionStorage.setItem("theme", currentTheme);
    }, [currentTheme]);

    //verifica se o tema salvo foi claro ou escuro e troca o tema do link, evitando o erro de tema escuro ao abrir a página pela primeira vez
    if (currentTheme === "viva-dark") {
        const link = document.getElementById("theme").href.replace("viva-light", "viva-dark");
        document.getElementById("theme").setAttribute("href", link)
    }

    const changeThemeFunc = () => {
        const newTheme = currentTheme === "viva-light" ? "viva-dark" : "viva-light";
        changeTheme(currentTheme, newTheme, "theme");
        setTheme(newTheme);
    };

    return (
        <Button
            icon={currentTheme === "viva-dark" ? "pi pi-sun" : "pi pi-moon"}
            className="p-button-outlined shadow-lg shadow-blue-500 mr-6 bg-(--primary-color-text)"
            severity="secondary"
            rounded
            text
            raised
            onClick={changeThemeFunc}
            tooltip={currentTheme === "viva-dark" ? data?.mode?.light : data?.mode?.dark} tooltipOptions={{ position: 'left' }}
        />
    );
}
