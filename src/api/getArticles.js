import axios from "axios";

export const getArticles = async () =>
    (await axios.get)(
        "https://654b8e0a5b38a59f28ef5169.mockapi.io/articles"
    );
