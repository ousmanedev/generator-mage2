<?php
namespace <%= moduleNamespace %>\Model\ResourceModel;
class <%= modelName %> extends \Magento\Framework\Model\ResourceModel\Db\AbstractDb
{
    protected function _construct()
    {
        $this->_init('<%= modelPath %>', '<%= modelPath %>_id');
    }
}
