# System-wide .bashrc file for interactive bash(1) shells.
#
# To enable the settings / commands in this file for login shells as well,
# this file has to be sourced in /etc/profile.

# If not running interactively, don't do anything
[ -z "$PS1" ] && return

# check the window size after each command and, if necessary,
# update the values of LINES and COLUMNS.
shopt -s checkwinsize

# enable bash completion in interactive shells
if [ -f /etc/bash_completion ]; then
	. /etc/bash_completion
fi

# if the command-not-found package is installed, use it
if [ -x /usr/lib/command-not-found ]; then
	function command_not_found_handle {
		# check because c-n-f could've been removed in the meantime
		if [ -x /usr/lib/command-not-found ]; then
				/usr/bin/python /usr/lib/command-not-found -- $1
				return $?
		else
				return 127
		fi
	}
fi

# set variable identifying the chroot you work in (used in the prompt below)
if [ -z "$debian_chroot" ] && [ -r /etc/debian_chroot ]; then
    debian_chroot=$(cat /etc/debian_chroot)
fi

use_color=false

# Set colorful PS1 only on colorful terminals.
# dircolors --print-database uses its own built-in database
# instead of using /etc/DIR_COLORS.  Try to use the external file
# first to take advantage of user additions.  Use internal bash
# globbing instead of external grep binary.
safe_term=${TERM//[^[:alnum:]]/?}   # sanitize TERM
match_lhs=""
[[ -f ~/.dir_colors   ]] && match_lhs="${match_lhs}$(<~/.dir_colors)"
[[ -f /etc/DIR_COLORS ]] && match_lhs="${match_lhs}$(</etc/DIR_COLORS)"
[[ -z ${match_lhs}    ]] \
		&& type -P dircolors >/dev/null \
		&& match_lhs=$(dircolors --print-database)
[[ $'\n'${match_lhs} == *$'\n'"TERM "${safe_term}* ]] && use_color=true

if ${use_color} ; then
	# Enable colors for ls, etc.  Prefer ~/.dir_colors #64489
	if type -P dircolors >/dev/null ; then
		if [[ -f ~/.dir_colors ]] ; then
			eval $(dircolors -b ~/.dir_colors)
		elif [[ -f /etc/DIR_COLORS ]] ; then
			eval $(dircolors -b /etc/DIR_COLORS)
		else
			eval $(dircolors)
		fi
	fi

	# Colors
	  black="\[\033[1;30m\]"
		red="\[\033[1;31m\]"
	  green="\[\033[1;32m\]"
	 yellow="\[\033[1;33m\]"
	   blue="\[\033[1;34m\]"
	magenta="\[\033[1;35m\]"
	   cyan="\[\033[1;36m\]"
	  white="\[\033[1;37m\]"
		end="\[\033[0;00m\]"

	# Prompt
	if [[ ${EUID} == 0 ]] ; then
		PS1="${debian_chroot:+($debian_chroot)}${red}\h${blue} \W \\\$${end} "
	else
		PS1="${debian_chroot:+($debian_chroot)}${green}\u@\h${blue} \W \\\$${end} "
	fi

	# Clean up
	unset red green yellow blue magenta cyan white end

	# Color Aliases
	alias ls='/bin/ls --color=auto'
	alias dir='/bin/dir -nLQ --block-size=k --show-control-chars --color=auto'
	alias files='/bin/dir -f --color=auto'
	alias grep='/bin/grep --color=auto'

else

	# Prompt
	if [[ ${EUID} == 0 ]] ; then
		PS1='\h \W \$ '
	else
		PS1='\u@\h \W \$ '
	fi

	# Non-color Aliases
	alias dir='/bin/dir -nLQ --block-size=k --show-control-chars'
	alias files='/bin/dir -f'

fi

# Clean up environment variables.
unset use_color safe_term match_lhs

export HISTCONTROL=ignoreboth:erasedups
export HISTIGNORE="&:exit: *"

# Aliases.
alias ver='lsb_release -idrc'
alias ll='ls -alq'
alias files='ls -f'
alias md='mkdir -p'
alias rd='rmdir -p'
alias del='rm -fI'
alias deltree='rm -rfI'
alias ren='mv'
alias cls='/bin/echo -ne "\033c"; astroquotes'

if [ "$0" = "bash" ]; then
	astroquotes fancy
fi
if [ "$0" == "-bash" ]; then
	astroquotes simple
fi
if [ "$TERM" = "tek4014" ]; then
	clear
fi

