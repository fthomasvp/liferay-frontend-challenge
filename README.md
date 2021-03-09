
# Liferay Frontend Challenge

MVP for gather data from GitHub API and display insightful information about a given GitHub repository.

## Installation

You should have these tools to run the application:

|Tool| Version |
|--|--|
| [Node.js](https://nodejs.org/en/download/) | >= 10.x |
| [Yarn](https://classic.yarnpkg.com/en/docs/install/) | >= 1.x |

> This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the terminal of your preference, *on the project root directory*, run **Yarn** to install the dependencies.

```bash
yarn install
```

## Usage

The project contains five main features.

To run the application, run the following command on the project root directory:

```bash
yarn start
```

### Add a new repository
![add repository](https://drive.google.com/uc?export=view&id=1iHVD0h2LQR4tQVKkRKU7eo__UtZ3auK9 "Adding a repository")

To add a repository, you will need to type the *username/project_name* or *organization/project_name*. For example:
> liferay/clay

Ensure that the repository is public, otherwise you'll get a feedback message like this:

![danger feedback on text input](https://drive.google.com/uc?export=view&id=1c1o_jpziTLCFH5oHgUPFw2YXtx4ntFUA "showing danger input feedback")

### Delete an existing repository
![delete repository](https://drive.google.com/uc?export=view&id=1wuzsGvl6-8HnTd-Y3xH9i5HmEGOK1HBC "Deleting a repository")

If you want to remove a repository from the list, you just need to click on the trash icon inside the repository card.
A modal should appear, with the name of the repository, asking you to confirm the deletion.

### Order by repository property
![order repositories](https://drive.google.com/uc?export=view&id=1RuhZfDwRbk0ADfFjv3eVYYnaJUE0Jixm "ordering repositories")

The available properties to sorting - by *descending* order - are:
- *Stars*
- *Forks*
- *Open issues*
- *Age*
- *Last commit*

### Filter by existing repository
![filter repositories](https://drive.google.com/uc?export=view&id=10XqDSM3eNTik-1-CWMroZsd0jBqRQhTh "filtering repositories by full name")

If you want to filter for specific repositories from your list, just type on the search input and press "Enter" or click on the search icon.

If no results were found, you can clear the filter and see your repositories again!

### Favorite repository
![favor a repository](https://drive.google.com/uc?export=view&id=1g9HAVbYeywj57e1ZVb_XauhFjC9FGRy- "favoring a repository")

If you want to quickly find repositories in your list, just click on the star icon inside the repository's card and filter them by clicking on the star icon on the toolbar.

## License

Unlicensed.
