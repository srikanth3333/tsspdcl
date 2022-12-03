

export const getBoardName = () => {
    let string = window.location.hostname
    string.substring(string.indexOf('/') + 1).split('.')[0]
    return string;
    // return "TSSPDCL";
}