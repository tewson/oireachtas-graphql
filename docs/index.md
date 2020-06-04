# oireachtas-graphql

An unofficial GraphQL proxy for [the Houses of the Oireachtas Open Data APIs](https://api.oireachtas.ie/).

## Motivation

The Oireachtas Open Data APIs provide dedicated API endpoints for different entity types. For example, we can make a query to the `/houses` endpoint for data on a specific Dáil term, and make another query to the `/members` endpoint to retrieve a list of members during that term.

[GraphQL](https://graphql.org/) can help us to better express what data we want to query and combine multiple queries into one.

## Example Use Case

Let's say we want to query all votes held in the 32nd Dáil and, for each vote, query each participating member's name and party.

Using the Oireachtas APIs as they are, we have to make at least 2 queries as follows:

1. A query to the `/divisions` endpoint to retrieve all votes filtered by the URI of the 32nd Dáil.
2. A query to the `/members` endpoint to retrieve all members of the 32nd Dáil.

We need both queries because the vote query alone doesn't return the full member data. This means we then need to combine both sets of data by mapping each vote's participant's URI to the member query results.

By using GraphQL, we can combine both queries into one similar to an example query below.

```gql
{
  house(type: dail, term: "32") {
    showAs
    votes {
      tallies {
        taVotes {
          members {
            fullName
            memberships {
              parties {
                showAs
              }
            }
          }
        }

        # And so on...
      }
    }
  }
}
```

This can help reduce the complexity of the client-side code.

## Queries

Coming soon...
