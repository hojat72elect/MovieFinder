export class Destination {
    public route: string;


    constructor(route: string) {
        this.route = route;

    }

    // The destinations you can reach through the bottom tab bar:
    public static Discover = new Destination("Discover");
    public static Search = new Destination("Search");
    public static Settings = new Destination("Settings");

    // All the other destinations outside the reach of bottom tab navigator
    public static Movie = new Destination("Movie");
}
