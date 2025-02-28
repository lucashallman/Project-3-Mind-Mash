
import axios from 'axios';

export const fetchTrivia = async () => {
    try {
        const response = await axios.get('https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple', {

        });
        return response.data;
    } catch (error) {
        console.error('Error fetching trivia:', error);
        return null;
    }
};



export const validateAnswer = (selectedAnswer: string, correctAnswer: any) => {
    return selectedAnswer === correctAnswer;

}
export const randomizeAnswers = (trivia: any, index: number) => {
    if (index < 0 || index >= trivia.results.length) {
        throw new Error('Index out of bounds');
    }
    let answers: string[] = [
        ...trivia.results[index].incorrect_answers,
        trivia.results[index].correct_answer
    ];
    return answers.sort(() => Math.random() - 0.5);
};
export const decodeHtml = (html: any) =>{
        let txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
}
export const convertSpecialCharacterCodes = (response: any) => {
    response.results.forEach((result: any) => {
        result.question = result.question.replace(/&quot;/g, '"')
            .replace(/&#039;/g, "'")
            .replace(/&amp;/g, "&")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/&rsquo;/g, "'")
            .replace(/&iuml;/g, "ï")
            .replace(/&eacute;/g, "é")
            .replace(/&aacute;/g, "á")
            .replace(/&ouml;/g, "ö")
            .replace(/&auml;/g, "ä")
            .replace(/&uuml;/g, "ü")
            .replace(/&shy;/g, "-")
            .replace(/&ntilde;/g, "ñ")
            .replace(/&iquest;/g, "¿")
            .replace(/&oacute;/g, "ó")
            .replace(/&uacute;/g, "ú")
            .replace(/&egrave;/g, "è")
            .replace(/&igrave;/g, "ì")
            .replace(/&ograve;/g, "ò")
            .replace(/&ugrave;/g, "ù")
            .replace(/&ccedil;/g, "ç")
            .replace(/&iexcl;/g, "¡")
            .replace(/&iacute;/g, "í")
            .replace(/&Eacute;/g, "É")
            .replace(/&Aacute;/g, "Á")
            .replace(/&Ouml;/g, "Ö")
            .replace(/&Auml;/g, "Ä")
            .replace(/&Uuml;/g, "Ü")

        result.correct_answer = result.correct_answer.replace(/&quot;/g, '"')
            .replace(/&#039;/g, "'")
            .replace(/&amp;/g, "&")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/&rsquo;/g, "'")
            .replace(/&iuml;/g, "ï")
            .replace(/&eacute;/g, "é")
            .replace(/&aacute;/g, "á")
            .replace(/&ouml;/g, "ö")
            .replace(/&auml;/g, "ä")
            .replace(/&uuml;/g, "ü")
            .replace(/&ntilde;/g, "ñ")
            .replace(/&shy;/g, "-")
            .replace(/&iquest;/g, "¿")
            .replace(/&oacute;/g, "ó")
            .replace(/&uacute;/g, "ú")
            .replace(/&egrave;/g, "è")
            .replace(/&igrave;/g, "ì")
            .replace(/&ograve;/g, "ò")
            .replace(/&ugrave;/g, "ù")
            .replace(/&ccedil;/g, "ç")
            .replace(/&iexcl;/g, "¡")
            .replace(/&iquest;/g, "¿")
            .replace(/&iacute;/g, "í")
            .replace(/&Eacute;/g, "É")
            .replace(/&Aacute;/g, "Á")
            .replace(/&Ouml;/g, "Ö")
            .replace(/&Auml;/g, "Ä")
            .replace(/&Uuml;/g, "Ü")

        result.incorrect_answers = result.incorrect_answers.map((answer: string) =>
            answer.replace(/&quot;/g, '"')
                .replace(/&#039;/g, "'")
                .replace(/&amp;/g, "&")
                .replace(/&lt;/g, "<")
                .replace(/&gt;/g, ">")
                .replace(/&rsquo;/g, "'")
                .replace(/&iuml;/g, "ï")
                .replace(/&eacute;/g, "é")
                .replace(/&aacute;/g, "á")
                .replace(/&ouml;/g, "ö")
                .replace(/&auml;/g, "ä")
                .replace(/&uuml;/g, "ü")
                .replace(/&ntilde;/g, "ñ")
                .replace(/&shy;/g, "-")
                .replace(/&iexcl;/g, "¡")
                .replace(/&iquest;/g, "¿")
                .replace(/&oacute;/g, "ó")
                .replace(/&uacute;/g, "ú")
                .replace(/&egrave;/g, "è")
                .replace(/&igrave;/g, "ì")
                .replace(/&ograve;/g, "ò")
                .replace(/&ugrave;/g, "ù")
                .replace(/&ccedil;/g, "ç")
                .replace(/&iacute;/g, "í")
                .replace(/&Eacute;/g, "É")
                .replace(/&Aacute;/g, "Á")
                .replace(/&Ouml;/g, "Ö")
                .replace(/&Auml;/g, "Ä")
                .replace(/&Uuml;/g, "Ü")
                

        );
    });
}

export default fetchTrivia;
