import { Song } from "../models/song.model.js";
//xử lý fulltext search trả về dữ liệu
export const fulltextSearch = async (req, res, next) => {
    try {
        const query = req.query.q ?? "";
        const pineline = [
            {
              $search: {
              index: "lyricsongandalbum",
              compound: {
                should: [
                {
                  autocomplete: {
                  query,
                  path: "lyrics",
                  tokenOrder: "any",
                  fuzzy: {
                      maxEdits: 2,
                      prefixLength: 3
                  }
                  }
                },
                {
                  autocomplete: {
                  query,
                  path: "title",
                  tokenOrder: "any",
                  fuzzy: {
                    maxEdits: 2,
                    prefixLength: 3
                  }
                  }
                }
                ],
                minimumShouldMatch: 1
              }
              }
            },
            {
              $addFields: {
                score: { $meta: "searchScore" },
                source: "Song"
              }
            },
            {
              $match: {
                score: { $gt: 0 }
              }
            },
            {
              $unionWith: {
              coll: "albums",
              pipeline: [
                {
                $search: {
                  index: "searchalbum",
                  autocomplete: {
                  query,
                  path: "title",
                  tokenOrder: "any",
                  fuzzy: {
                      maxEdits: 2,
                      prefixLength: 3
                  }
                  }
                }
                },
                {
                  $addFields: {
                      score: { $meta: "searchScore" },
                      source: "Album"
                  }
                },
                {
                  $match: {
                      score: { $gt: 0 }
                  }
                }
              ]
              }
            },
            // Sắp xếp kết quả cuối cùng theo độ liên quan
            {
              $sort: { score: -1 }
            }
        ]
        const results = await Song.aggregate(pineline);
        res.status(200).json(results);
    } catch (error) {
        next(error);
    }
};