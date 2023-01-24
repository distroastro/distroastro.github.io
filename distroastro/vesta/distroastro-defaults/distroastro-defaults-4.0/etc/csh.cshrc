# System-wide .cshrc file for interactive csh(1) and tcsh(1) shells.

if ($?tcsh && $?prompt) then

	bindkey "\e[1~" beginning-of-line # Home
	bindkey "\e[7~" beginning-of-line # Home rxvt
	bindkey "\e[2~" overwrite-mode    # Ins
	bindkey "\e[3~" delete-char       # Delete
	bindkey "\e[4~" end-of-line       # End
	bindkey "\e[8~" end-of-line       # End rxvt

	set autoexpand
	set autolist

endif

# Use color if supported by terminal.
if ( `where dircolors` != "" && `dircolors --print-database` =~ "* TERM $TERM *" ) then

	# Colors
	set   black="%{\033[1;30m%}"
	set     red="%{\033[1;31m%}"
	set   green="%{\033[1;32m%}"
	set  yellow="%{\033[1;33m%}"
	set    blue="%{\033[1;34m%}"
	set magenta="%{\033[1;35m%}"
	set    cyan="%{\033[1;36m%}"
	set   white="%{\033[1;37m%}"
	set     end="%{\033[0;00m%}"

	# Prompt
	if ( `id -u` == "0" ) then
		set prompt="${red}%m ${magenta}%C %#${end} "
	else
		set prompt="${green}%n@%m ${magenta}%C %#${end} "
	endif

	# Clean up
	unset red green yellow blue magenta cyan white end

	# Color Aliases
	alias ls '/bin/ls --color=auto'
	alias dir '/bin/dir -nLQ --block-size=k --show-control-chars --color=auto'
	alias files '/bin/dir -f --color=auto'
	alias grep '/bin/grep --color=auto'

else

	# Prompt
	if ( `id -u` == "0" ) then
		set prompt="%B%m%b %C %# "
	else
		set prompt="%B%n@%m%b %C %# "
	endif

	# Non-color Aliases
	alias dir '/bin/dir -nLQ --block-size=k --show-control-chars'
	alias files '/bin/dir -f'

endif

# Aliases.
alias ver 'lsb_release -idrc'
alias ll 'ls -alq'
alias md 'mkdir -p'
alias rd 'rmdir -p'
alias del 'rm -fI'
alias deltree 'rm -rfI'
alias ren 'mv'
alias cls '/bin/echo -ne "\033c"; /usr/bin/mint-fortune'

if ( "$0" == "csh" || "$0" == "tcsh" ) then
	astroquotes fancy
endif
if ( "$0" == "-csh" || "$0" == "-tcsh" ) then
	astroquotes simple
endif
if ( "$TERM" == "tek4014" ) then
	clear
endif

