module.exports = (event) => {
    const { body } = event;
    if (!body) throw new Error('No body found');
    return JSON.parse(body);
}