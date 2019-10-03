import idGeneratorHelper from "./idGeneratorHelper";

const parseFileHelper = (lines) => {

    const objects = []
    const filteredLines = lines.filter(line => line.length > 1)
    for(let i = 0; i < filteredLines.length; i = i + 4) {
        objects.push({
            title: filteredLines[i].split(':')[1].trim(),
            year: filteredLines[i+1].split(':')[1].trim(),
            format: filteredLines[i+2].split(':')[1].trim(),
            stars: filteredLines[i+3].split(':')[1].trim().split(','),
            myId: idGeneratorHelper()
        })
    }

    return objects;
}

export default parseFileHelper;