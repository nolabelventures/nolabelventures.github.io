# -*- encoding: utf-8 -*-
# stub: http_parser.rb 0.8.0 ruby lib
# stub: ext/ruby_http_parser/extconf.rb

Gem::Specification.new do |s|
  s.name = "http_parser.rb".freeze
  s.version = "0.8.0".freeze

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Marc-Andre Cournoyer".freeze, "Aman Gupta".freeze]
  s.date = "2025-04-25"
  s.description = "Ruby bindings to https://github.com/joyent/http-parser and https://github.com/http-parser/http-parser.java".freeze
  s.email = ["macournoyer@gmail.com".freeze, "aman@tmm1.net".freeze]
  s.extensions = ["ext/ruby_http_parser/extconf.rb".freeze]
  s.files = [".github/workflows/linux.yml".freeze, ".github/workflows/windows.yml".freeze, ".gitignore".freeze, ".gitmodules".freeze, "Gemfile".freeze, "LICENSE-MIT".freeze, "README.md".freeze, "Rakefile".freeze, "bench/standalone.rb".freeze, "bench/thin.rb".freeze, "ext/ruby_http_parser/.gitignore".freeze, "ext/ruby_http_parser/RubyHttpParserService.java".freeze, "ext/ruby_http_parser/ext_help.h".freeze, "ext/ruby_http_parser/extconf.rb".freeze, "ext/ruby_http_parser/org/ruby_http_parser/RubyHttpParser.java".freeze, "ext/ruby_http_parser/ruby_http_parser.c".freeze, "ext/ruby_http_parser/vendor/.gitkeep".freeze, "ext/ruby_http_parser/vendor/http-parser".freeze, "ext/ruby_http_parser/vendor/http-parser-java".freeze, "http_parser.rb.gemspec".freeze, "lib/http/parser.rb".freeze, "lib/http_parser.rb".freeze, "tasks/compile.rake".freeze, "tasks/fixtures.rake".freeze, "tasks/spec.rake".freeze, "tasks/submodules.rake".freeze]
  s.homepage = "https://github.com/tmm1/http_parser.rb".freeze
  s.licenses = ["MIT".freeze]
  s.rubygems_version = "3.5.22".freeze
  s.summary = "Simple callback-based HTTP request/response parser".freeze

  s.installed_by_version = "3.5.22".freeze

  s.specification_version = 4

  s.add_development_dependency(%q<rake-compiler>.freeze, ["~> 1.0".freeze])
  s.add_development_dependency(%q<rspec>.freeze, ["~> 3".freeze])
  s.add_development_dependency(%q<json>.freeze, ["~> 2.1".freeze])
  s.add_development_dependency(%q<benchmark_suite>.freeze, ["~> 1.0".freeze])
  s.add_development_dependency(%q<ffi>.freeze, ["~> 1.9".freeze])
  s.add_development_dependency(%q<yajl-ruby>.freeze, ["~> 1.3".freeze])
end
