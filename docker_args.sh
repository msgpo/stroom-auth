# ARG_POSITIONAL_SINGLE([operation],[The docker operation to perform: either build, push, or publish (which is both)],[])
# ARG_POSITIONAL_SINGLE([tag],[The tag to use, e.g. dev-SNAPSHOT or v0.1-alpha.11],[])
# ARG_DEFAULTS_POS()
# ARG_HELP([This script will help you build and publish docker images.])
# ARG_VERSION([echo $0 v0.1])
# ARGBASH_SET_INDENT([  ])
# ARGBASH_GO()
# needed because of Argbash --> m4_ignore([
### START OF CODE GENERATED BY Argbash v2.6.1 one line above ###
# Argbash is a bash code generator used to get arguments parsing right.
# Argbash is FREE SOFTWARE, see https://argbash.io for more info
# Generated online by https://argbash.io/generate

die()
{
  local _ret=$2
  test -n "$_ret" || _ret=1
  test "$_PRINT_HELP" = yes && print_help >&2
  echo "$1" >&2
  exit ${_ret}
}

begins_with_short_option()
{
  local first_option all_short_options
  all_short_options='hv'
  first_option="${1:0:1}"
  test "$all_short_options" = "${all_short_options/$first_option/}" && return 1 || return 0
}



# THE DEFAULTS INITIALIZATION - POSITIONALS
_positionals=()
_arg_operation=
_arg_tag=
# THE DEFAULTS INITIALIZATION - OPTIONALS

print_help ()
{
  printf '%s\n' "This script will help you build and publish docker images."
  printf 'Usage: %s [-h|--help] [-v|--version] <operation> <tag>\n' "$0"
  printf '\t%s\n' "<operation>: The docker operation to perform: either build, push, or publish (which is both)"
  printf '\t%s\n' "<tag>: The tag to use, e.g. dev-SNAPSHOT or v0.1-alpha.11"
  printf '\t%s\n' "-h,--help: Prints help"
  printf '\t%s\n' "-v,--version: Prints version"
}

parse_commandline ()
{
  while test $# -gt 0
  do
    _key="$1"
    case "$_key" in
      -h|--help)
        print_help
        exit 0
        ;;
      -h*)
        print_help
        exit 0
        ;;
      -v|--version)
        echo $0 v0.1
        exit 0
        ;;
      -v*)
        echo $0 v0.1
        exit 0
        ;;
      *)
        _positionals+=("$1")
        ;;
    esac
    shift
  done
}


handle_passed_args_count ()
{
  _required_args_string="'operation' and 'tag'"
  test ${#_positionals[@]} -ge 2 || _PRINT_HELP=yes die "FATAL ERROR: Not enough positional arguments - we require exactly 2 (namely: $_required_args_string), but got only ${#_positionals[@]}." 1
  test ${#_positionals[@]} -le 2 || _PRINT_HELP=yes die "FATAL ERROR: There were spurious positional arguments --- we expect exactly 2 (namely: $_required_args_string), but got ${#_positionals[@]} (the last one was: '${_positionals[*]: -1}')." 1
}

assign_positional_args ()
{
  _positional_names=('_arg_operation' '_arg_tag' )

  for (( ii = 0; ii < ${#_positionals[@]}; ii++))
  do
    eval "${_positional_names[ii]}=\${_positionals[ii]}" || die "Error during argument parsing, possibly an Argbash bug." 1
  done
}

parse_commandline "$@"
handle_passed_args_count
assign_positional_args

# OTHER STUFF GENERATED BY Argbash

### END OF CODE GENERATED BY Argbash (sortof) ### ])
# [ <-- needed because of Argbash
# ] <-- needed because of Argbash
