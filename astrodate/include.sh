#!/bin/sh

exec="$(basename "$0")"

dir=$(dirname "$(readlink -f -- "$0")")

if [ "$*" ]; then
	InputType="$1"
	if [ "$InputType" = "MJD" ]; then
		posixtime=$(echo "86400 * ($2 - 40587)" | bc)
	elif [ "$InputType" = "JD" ]; then
		posixtime=$(echo "86400 * ($2 - 2400000.5 - 40587)" | bc)
	elif [ "$InputType" = "J" ]; then
		posixtime=$(echo "86400 * (365.25000000000 * ($2 - 2000.0) + 51544.50000 - 40587)" | bc)
	elif [ "$InputType" = "B" ]; then
		posixtime=$(echo "86400 * (365.24219878125 * ($2 - 1900.0) + 15019.81352 - 40587)" | bc)
	elif [ "$InputType" = "UNIX" ] || [ "$1" = "POSIX" ] ; then
		posixtime=$(echo "$2" | sed -e "s/^@//g" | bc -l)
	elif [ "$InputType" = "NTP" ] ; then
		posixtime=$(echo "$2 - 2208988800" | bc -l)
	elif [ "$InputType" = "Y" ]; then
		LC_ALL=C y=${2%.*}; AD_BC=$((y>0)); leap=$(( $((y%4==0)) - $((y%100==0)) + $((y%400==0)) ))
		posixtime=$(echo "86400 * (365*$2 + ($2-$AD_BC)/4 - ($2-$AD_BC)/100 + ($2-$AD_BC)/400 - 719528 + $AD_BC + $leap*($2 - $y))" | bc)
	else InputType="DATE"
		posixtime=$(date -u --date="$*" +"%s + %N*0.000000001" 2>/dev/null | bc)
		if [ -z "$posixtime" ]; then
			echo "$exec: invalid date '$*'" >&2
			exit 1
		fi
	fi
else InputType="DATE"
	posixtime=$(date -u +"%s" 2>/dev/null | bc)
fi

posixtime=$(echo "$posixtime*1.000000000000" | bc)
ntptime=$(echo "$posixtime + 2208988800" | bc)
mjdtime=$(echo "$posixtime / 86400 + 40587" | bc -l)
jdntime=$(echo "$mjdtime + 2400000.5" | bc -l)

y=$(date -u --date="@$posixtime" +%Y | bc); AD_BC=$((y>0)); leap=$(( $((y%4==0)) - $((y%100==0)) + $((y%400==0)) ))
yfrac=$(echo "($mjdtime - $(echo "365*$y + ($y-$AD_BC)/4 - ($y-$AD_BC)/100 + ($y-$AD_BC)/400 - 678941 + $AD_BC" | bc) )/(365+$leap)" | bc -l)
Y=$(echo "$y + $yfrac" | bc)
J=$(echo "2000.0 + ($mjdtime - 51544.50000) / 365.250000000" | bc -l)
T=$(echo "1900.0 + ($mjdtime - 15019.81352) / 365.242198781" | bc -l)

mjddate=$(echo "$mjdtime/1 + $AD_BC - 1" | bc)
cfrac=$(echo "($Y - $(echo "$Y/100 * 100" | bc)) / 100" | bc -l)
dfrac=$(LC_ALL=C echo "$AD_BC * ($mjdtime - ${mjdtime%.*})" | bc)
sfrac=$(date --date="@$posixtime" +'%N*0.000000001' | bc | sed 's/0*$//')

configdir="$HOME/.config/astrodate"; mkdir -p "$configdir"
unset AD_BC

round() {
	num="$1"; scale="$2"; min="$3"; max="$4";
	[ "$min" ] && [ "$scale" -lt "$min" ] && scale="$min"; [ "$max" ] && [ "$scale" -gt "$max" ] && scale="$max"
	pnum=$(printf "%f\n" "$num"); LC_ALL=C sign=$(($((${pnum%.*}>0))*2-1));
	echo "scale=$scale; $(echo "($num * 10^$scale + $sign*0.5)/1" | bc)/10^$scale" | bc -l | sed 's/^\./0./' | sed 's/^-\./-0./'
}

printdate() {
	[ "$InputType" = "Y" -o "$InputType" = "J" -o "$InputType" = "B" ] && YMax="16" || YMax="17"
	LC_ALL=C F=${sfrac##*.}
	case $1 in
	Y)
		echo "Y $(round "$Y" $((8+${#F})) 8 $YMax)"
		;;
	J)
		echo "J $(round "$J" $((8+${#F})) 8 $YMax)"
		;;
	B)
		echo "B $(round "$T" $((8+${#F})) 8 $YMax)"
		;;
	JD)
		echo "JD $(round "${jdntime?}" $((5+${#F})) 5 14)"
		;;
	MJD)
		echo "MJD $(round "${mjdtime?}" $((5+${#F})) 5 14)"
		;;
	NTP)
		echo "NTP $(round "${ntptime?}" ${#F} 1 9)"
		;;
	UNIX)
		echo "UNIX $(round "${posixtime?}" ${#F} 1 9)"
		;;
	*)
		posixtime=$(round "$posixtime" 9)
		sfrac="$(date --date="@$posixtime" +'%N*0.000000001' | bc | sed 's/0*$//')"
		date -u --date="@${posixtime?}" +"%a %Y-%m-%d %T${sfrac?} UTC"
		;;
	esac
	return 0
}

printsep() {
	echo "——"
}

printtime() {
	if [ -x "$dir/$1" ]; then
		SHOWDEFN="$2" NOWARN="$3" "$dir/$1" "@$posixtime" 2>/dev/null
	else
		case $1 in
		tai_gps)
			[ "$2" ] && tai_gps="TAI-GPS="
			[ "$y" -ge "1980" ] && echo "${tai_gps}19" ;;
		tt_tai)
			[ "$2" ] && tt_tai="TT-TAI="
			[ "$y" -ge "1958" ] && echo "${tt_tai}32.184" ;;
		esac
	fi
	return 0
}

__unusedvars__() {
	# Anti-shellcheck device
	cfrac="${cfrac?}"
	dfrac="${dfrac?}"
	mjddate="${mjddate?}"
}

