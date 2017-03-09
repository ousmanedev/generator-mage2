<?php
namespace <%= moduleNamespace %>\Api;

use <%= moduleNamespace %>\Model\<%= modelName %>Interface;
use Magento\Framework\Api\SearchCriteriaInterface;

interface <%= modelName %>RepositoryInterface
{
  public function save(<%= modelName %>Interface $page);

  public function getById($id);

  public function getList(SearchCriteriaInterface $criteria);

  public function delete(<%= modelName %>Interface $page);

  public function deleteById($id);
}
