<?php
namespace <%= moduleNamespace %>\Model\ResourceModel\<%= modelName %>;
class Collection extends \Magento\Framework\Model\ResourceModel\Db\Collection\AbstractCollection
{
    protected function _construct()
    {
        $this->_init('<%= moduleNamespace %>\Model\<%= modelName %>','<%= moduleNamespace %>\Model\ResourceModel\<%= modelName %>');
    }
}
