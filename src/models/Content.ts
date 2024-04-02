class Content {
    title: string = ""
    url: string = ""
    thumbnail: string = ""
    alternative: string = ""
    author: string = ""
    status: string = ""
    lastUpdate: string = ""
    view: string = ""
    description: string = ""
    genres: string = ""
    chapters: [] = []

    // history
    currentChapter: number = 0
    recentlyRead: Date = new Date()

    // favorite
    createdAt: Date = new Date()
    id: string = ""

    constructor(url: string, title: string, thumbnail: string, createAt: Date = new Date(), id: string = "", currentChapter: number = 0, recentRead: Date = new Date()) {
        this.thumbnail = thumbnail
        this.title = title
        this.url = url
        this.createdAt = createAt
        this.currentChapter = currentChapter
        this.recentlyRead = recentRead
        this.id = id
    }
}

export default Content