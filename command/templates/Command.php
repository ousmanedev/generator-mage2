<?php
namespace <%= namespace %>;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class <%= commandClassName %> extends Command
{
  protected function configure() {
    $this->setName("<%= commandName %>");
    $this->setDescription("A new command");
    parent::configure();
  }

  protected function execute(InputInterface $input, OutputInterface $output) {
    $output->writeln("Hello World");
  }
}
