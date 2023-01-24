# Executed by csh for login shells after .cshrc

# include .cshrc if it exists
if (-f $HOME/.cshrc) then
	source "$HOME/.cshrc"
endif

# set PATH so it includes user's private bin if it exists
if (-e $HOME/bin) then
	set path=($HOME/bin $path)
endif
if (-e $HOME/.local/bin) then
	set path=($HOME/.local/bin $path)
endif

