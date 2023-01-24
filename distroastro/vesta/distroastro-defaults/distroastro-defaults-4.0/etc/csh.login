# System-wide .login file for the C shell (csh(1))
# and compatible shells (tcsh(1), ...).

# Allow for other packages/sysadmins to customize the shell environment
if (-e /etc/csh/login.d && `/bin/ls /etc/csh/login.d` != "") then
	foreach FILE (`/bin/ls /etc/csh/login.d/*`)
		source $FILE;
	end;
endif
if (-e /etc/profile.d && `/bin/ls /etc/profile.d` != "") then
	foreach FILE (`/bin/ls /etc/profile.d/*.csh`)
		source $FILE;
	end;
endif

