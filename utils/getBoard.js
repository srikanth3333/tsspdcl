

export const getBoardName = () => {
    let string = window.location.href
    let final = string.substring(string.indexOf('//') + 1).split('.')[0]
    let output = final.replace("/","").toUpperCase()
    return "TSNPDCL";
    // return output;
}