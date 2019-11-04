class Helper {
    static ucfirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    static lcfirst(string) {
        return string.charAt(0).toLowerCase() + string.slice(1);
    }
}