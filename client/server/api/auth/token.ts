export default defineEventHandler((event) => {
    const token = getCookie(event, "token");

    return token ? true : false;
});