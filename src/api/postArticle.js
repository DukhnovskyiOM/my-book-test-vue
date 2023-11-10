import axios from "axios";

export const postArticle = async (item) =>
    (await axios.post)(
        "https://654b8e0a5b38a59f28ef5169.mockapi.io/articles",
        item
    );
