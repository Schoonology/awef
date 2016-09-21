# Awef

A quicker way to open projects in your editor of choice.

## Usage

```
awef path
```

Awef defers to the operating system (using native tools like `xdg-open` and
friends) for which editor to use, passing the argument in verbatim. The one
scenario Awef treats differently is when a known project file exists in the
provided directory. In this situation Awef will open _that_ project file
instead. If multiple project files exist, Awef will prompt the user to select
one.

In other words:

1. If `path` is a directory _and_ a single project file (e.g.
`code.sublime-project`) exists in that directory, that project file is opened.
1. If `path` is a directory and _multiple_ project files exist, then the user
is prompted to choose one, and the chosen project file is opened.
1. Otherwise—if `path` is either not a directory or there is no known project
file—`path` is opened directly.
