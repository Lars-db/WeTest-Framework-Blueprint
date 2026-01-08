export enum RegexPatterns {
    EMAIL = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
    PHONE_NUMBER = "^\\+?[1-9]\\d{1,14}$",
    ZIP_CODE_US = "^\\d{5}(-\\d{4})?$",
    HEX_COLOR = "^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$",
    URL = "^(https?:\\/\\/)?([\\da-z.-]+)\\.([a-z.]{2,6})([\\/\\w .-]*)*\\/?$"
}