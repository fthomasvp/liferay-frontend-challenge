
# Liferay Frontend Challenge

MVP for gather data from GitHub API and display insightful information about a given GitHub repository.

## Installation

You should have these tools to run the application:

|Tool| Version |
|--|--|
| [Node.js](https://nodejs.org/en/download/) | >= 14.17.x |
| [Yarn](https://classic.yarnpkg.com/en/docs/install/) | >= 1.22.x |

> This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the terminal of your preference, *on the project root directory*, run **Yarn** to install the dependencies.

```bash
yarn install
```

## Usage

The project contains five main features.

To start the application, run the following command on the project root directory:

```bash
yarn start
```

### Add a repository
![add repository](https://drive.google.com/uc?export=view&id=1iHVD0h2LQR4tQVKkRKU7eo__UtZ3auK9 "Adding a repository")

To add a repository, you will need to type the *username/project_name* or *organization/project_name*.

For example:
> liferay/clay

Ensure that the repository is public, otherwise you'll get an error message:

![danger feedback on text input](https://drive.google.com/uc?export=view&id=1c1o_jpziTLCFH5oHgUPFw2YXtx4ntFUA "showing danger input feedback")

### Delete a repository
![delete repository](https://drive.google.com/uc?export=view&id=1wuzsGvl6-8HnTd-Y3xH9i5HmEGOK1HBC "Deleting a repository")

If you want to remove a repository, you just need to click on the trash icon inside the repository card.
A modal should appear with the name of the repository, asking you to confirm the deletion.

### Sort repositories by property
![order repositories](https://drive.google.com/uc?export=view&id=1RuhZfDwRbk0ADfFjv3eVYYnaJUE0Jixm "sorting repositories")

These are the available properties to sort - using *descending*:
- *Stars*
- *Forks*
- *Open issues*
- *Age*
- *Last commit*

### Filter repositories
![filter repositories](https://drive.google.com/uc?export=view&id=10XqDSM3eNTik-1-CWMroZsd0jBqRQhTh "filtering repositories by full name")

If you want to filter for specific repositories, just type on the search input and press "Enter" or click on the search icon.

If no results were found, you can clear the filter and see your repositories again!

### Favorite a repository
![favor a repository](https://drive.google.com/uc?export=view&id=1g9HAVbYeywj57e1ZVb_XauhFjC9FGRy- "star a repository")

If you want to quickly view your favourites repositories, just click on the star icon inside the repository's card and filter them by clicking on the star icon on the toolbar.

## License

Unlicensed.
